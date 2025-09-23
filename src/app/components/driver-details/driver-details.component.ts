import { Component, OnInit } from '@angular/core';
import { Firestore, doc, docData, collection, collectionData, query, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

// TypeScript interfaces aligned with Dart models
interface Vehicle {
  carteGriseFront: string;
  carteGriseBack: string;
  carteIdentityFront: string;
  carteIdentityBack: string;
  cin: string;
  matVehicle: string;
  idDriver: string;
  maxWeight: number;
  maxVolume: number;
  type: string;
  vehicleImage: string;
  isAdminApproved?: boolean;
}

interface ShnellUser {
  email: string;
  name: string;
  phone: string;
  role: string;
  vehicleId?: string;
  vehicleType?: string;
  fcmToken?: string;
  balance?: number;
  isActive?: boolean;
  profileImage?: string;
  darkMode?: boolean;
}

interface Rating {
  userId: string;
  rating: number;
  additionalInfos?: string;
  time?: any; // Firestore Timestamp
}

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {
  driverId: string | null = null;
  driver$!: Observable<ShnellUser | null>;
  vehicle$!: Observable<Vehicle | null>;
  avgRating$!: Observable<{ avg: number; count: number } | null>;
  errorMessage: string | null = null;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get driverId from route parameter
    this.driverId = this.route.snapshot.paramMap.get('id');
    console.log('Route driverId:', this.driverId);

    if (!this.driverId) {
      this.errorMessage = 'Driver ID is missing or invalid';
      console.error(this.errorMessage);
      return;
    }

    // 1️⃣ Fetch Driver Data
    const driverDocRef = doc(this.firestore, `users/${this.driverId}`);
    this.driver$ = docData(driverDocRef, { idField: 'id' }).pipe(
      map(data => (data ? (data as ShnellUser) : null)),
      tap(driver => console.log('Fetched driver:', driver)),
      catchError(err => {
        this.errorMessage = 'Failed to fetch driver data';
        console.error('Driver fetch error:', err);
        return of(null);
      })
    );

    // 2️⃣ Fetch Vehicle Data
    this.vehicle$ = this.driver$.pipe(
      switchMap(driver => {
        if (!driver || !driver.vehicleId) {
          console.log('No driver or vehicleId:', driver);
          return of(null);
        }
        const vehicleDocRef = doc(this.firestore, `vehicules/${driver.vehicleId}`);
        return docData(vehicleDocRef, { idField: 'id' }).pipe(
          map(data => (data ? (data as Vehicle) : null)),
          tap(vehicle => console.log('Fetched vehicle:', vehicle)),
          catchError(err => {
            console.error('Vehicle fetch error:', err);
            return of(null);
          })
        );
      })
    );

    // 3️⃣ Fetch Ratings and Calculate Average
    const ratingsCol = collection(this.firestore, 'ratings');
    const ratingsQuery = query(ratingsCol, where('userId', '==', this.driverId));
    this.avgRating$ = collectionData(ratingsQuery, { idField: 'id' }).pipe(
      map(ratings => {
        if (!ratings || ratings.length === 0) {
          console.log('No ratings found for driver:', this.driverId);
          return { avg: 0, count: 0 };
        }
        const validRatings = ratings as Rating[];
        const count = validRatings.length;
        const total = validRatings.reduce((sum, r) => sum + (r.rating || 0), 0);
        const avg = count > 0 ? total / count : 0;
        console.log('Ratings:', validRatings, { avg, count });
        return { avg: parseFloat(avg.toFixed(1)), count };
      }),
      catchError(err => {
        console.error('Ratings fetch error:', err);
        return of({ avg: 0, count: 0 });
      })
    );
  }

  // Handle broken images
  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/default-image.png';
  }
}
