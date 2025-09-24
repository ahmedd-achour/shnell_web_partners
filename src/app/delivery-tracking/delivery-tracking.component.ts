import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc, collection, query, where, getDocs, onSnapshot } from '@angular/fire/firestore';
import { Database, ref, onValue } from '@angular/fire/database';
import { inject } from '@angular/core';
import { DropOffDataModel } from '../../Models/dropoffdata.model';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-delivery-tracking',
  templateUrl: './delivery-tracking.component.html',
  styleUrls: ['./delivery-tracking.component.scss']
})
export class DeliveryTrackingComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  private db: Database = inject(Database);

  constructor(private route: ActivatedRoute) {}

  mapZoom = 15;
  driverName = "";
  driverPhoneNumber ="";
  mapCenter!: google.maps.LatLngLiteral;
  driverPosition: google.maps.LatLngLiteral | null = null;
  stopPosition!: google.maps.LatLngLiteral;

  driverMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: 'img/delivery_boy.png',
      scaledSize: new google.maps.Size(24, 24)
    },
    title: 'Delivery Boy'
  };
  stopMarkerOptions: google.maps.MarkerOptions = {};
  driverCircleOptions: google.maps.CircleOptions = {
    strokeColor: '#796e12ff',
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: '#756d1fff',
    fillOpacity: 0.35,
    radius: 200,
  };

  stopData!: DropOffDataModel;

  loading = true;
  errorMessage: string | null = null;
  trackingAvailable = false;
  driverAvailable = false;
  etaMinutes: number = 0;


  ngOnInit() {
    const stopId = this.route.snapshot.paramMap.get('stopID');
    if (!stopId) {
      this.errorMessage = '❌ Invalid tracking link';
      this.loading = false;
      return;
    }
    this.setupTracking(stopId);
  }

  private async setupTracking(stopId: string): Promise<void> {
    try {
      const stopDocRef = doc(this.firestore, `stops/${stopId}`);

      onSnapshot(stopDocRef, async (stopSnap) => {
        if (!stopSnap.exists()) {
          this.errorMessage = '❌ Stop not found';
          this.loading = false;
          return;
        }

        const data = stopSnap.data();
        this.stopData = DropOffDataModel.fromFirestore(data);

        // --- NEW: Check if the tracking link has expired (24 hours) ---
        const creationTimestamp = data['date']?.toDate();
        if (creationTimestamp) {
          const currentTime = new Date();
          const timeDifference = currentTime.getTime() - creationTimestamp.getTime();
          const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

          if (timeDifference > twentyFourHoursInMs) {
            this.errorMessage = '❌ Tracking link has expired (more than 24 hours old).';
            this.trackingAvailable = false;
            this.loading = false;
            return;
          }
        }

        // --- Check if the delivery is completed --- ,
        if (this.stopData.isdelivered) {
          this.errorMessage = '✅ Delivery has been completed.';
          this.trackingAvailable = false;
          this.loading = false;
          return;
        }

        this.trackingAvailable = true;
        this.stopPosition = { lat: this.stopData.destination.lat, lng: this.stopData.destination.lng };
        this.mapCenter = this.stopPosition;
        this.stopMarkerOptions = { ...this.stopMarkerOptions,};

         const driverId = await this.findDriverIdByStopId(this.firestore, stopId);


if (driverId) {
  const driverDocRef = doc(this.firestore, `users/${driverId}`);
  const driverSnap = await getDoc(driverDocRef);
  if (driverSnap.exists()) {
    const driverData = driverSnap.data();
    this.driverName = driverData['name'] ?? 'N/A';
    this.driverPhoneNumber = driverData['phone'] ?? null;
  }
}
        if (driverId) {
          const driverRef = ref(this.db, `locations/${driverId}/coordinates`);
          onValue(driverRef, (snapshot) => {
            const pos = snapshot.val();
            if (Array.isArray(pos) && pos.length >= 2) {
              this.driverAvailable = true;
              this.driverPosition = { lat: pos[1], lng: pos[0] };
              this.calculateETA();
              this.updateMapBounds();
            } else {
              this.driverAvailable = false;
              this.driverPosition = null;
            }
            this.loading = false;
          });
        } else {
          this.driverAvailable = false;
          this.loading = false;
          this.errorMessage = '❌ Driver could not be found for this delivery.';
        }
      }, (err) => {
        console.error('Firestore read error:', err);
        this.errorMessage = '❌ Something went wrong while loading data.';
        this.loading = false;
      });

    } catch (err) {
      console.error('An error occurred during tracking setup:', err);
      this.errorMessage = '❌ Something went wrong while loading data.';
      this.loading = false;
    }
  }

  // The rest of the helper methods remain the same
  private async findDriverIdByStopId(firestore: Firestore, stopId: string): Promise<string | null> {
    try {
      const ordersRef = collection(firestore, 'orders');
      const ordersQuery = query(ordersRef, where('stops', 'array-contains', stopId));
      const ordersSnap = await getDocs(ordersQuery);

      if (ordersSnap.empty) {
        return null;
      }

      const orderDoc = ordersSnap.docs[0];
      const orderId = orderDoc.id;

      const dealsRef = collection(firestore, 'deals');
      const dealsQuery = query(dealsRef, where('idOrder', '==', orderId));
      const dealsSnap = await getDocs(dealsQuery);

      if (dealsSnap.empty) {
        return null;
      }

      const dealDoc = dealsSnap.docs[0];
      const driverId = dealDoc.data()['idDriver'];

      return driverId || null;

    } catch (error) {
      console.error('Error fetching driver ID:', error);
      return null;
    }
  }

  private getAverageSpeed(distanceInKm: number): number {
    if (distanceInKm < 5) {
      return 20;
    } else if (distanceInKm >= 5 && distanceInKm < 50) {
      return 40;
    } else {
      return 80;
    }
  }

  private calculateETA(): void {
    if (!this.driverPosition || !this.stopPosition) {
      this.etaMinutes = 0;
      return;
    }
    const distanceMeters = this.getDistanceMeters(this.driverPosition, this.stopPosition);
    const distanceKm = distanceMeters / 1000;
    const avgSpeedKmh = this.getAverageSpeed(distanceKm);
    const timeInHours = distanceKm / avgSpeedKmh;
    this.etaMinutes = Math.ceil(timeInHours * 60);
  }

  private getDistanceMeters(p1: google.maps.LatLngLiteral, p2: google.maps.LatLngLiteral): number {
    const R = 6371000;
    const dLat = this.deg2rad(p2.lat - p1.lat);
    const dLng = this.deg2rad(p2.lng - p1.lng);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(p1.lat)) * Math.cos(this.deg2rad(p2.lat)) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  private updateMapBounds(): void {
    if (this.driverPosition && this.stopPosition) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(this.driverPosition);
      bounds.extend(this.stopPosition);
      this.mapCenter = bounds.getCenter().toJSON();

      const distance = this.getDistanceMeters(this.driverPosition, this.stopPosition);
      if (distance > 0) {
        this.mapZoom = 13
      }
    }
  }
  headerCollapsed = false
}
