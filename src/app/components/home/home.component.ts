import { Component } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { DropOffDataModel } from '../../../Models/dropoffdata.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private firestore: Firestore = inject(Firestore);
  phoneNumber: string = '';
  activeStops: { id: string, data: DropOffDataModel }[] = [];
  loading: boolean = false;

  constructor(private router: Router) {}

  async trackStops() {
    if (!this.phoneNumber) {
      alert('Please enter a phone number.');
      return;
    }

    this.loading = true;
    this.activeStops = [];

    try {
      const stopsRef = collection(this.firestore, 'stops');
      const q = query(
        stopsRef,
        where('phoneNumber', '==', this.phoneNumber),
        where('isdelivered', '==', null)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('No active stops found for this phone number.');
      } else if (querySnapshot.size === 1) {
        // Single stop → navigate to its tracking page
        const stopId = querySnapshot.docs[0].id;
        this.router.navigate([`/${stopId}`]);
      } else {
        // Multiple active stops → list them in table
        querySnapshot.forEach(docSnap => {
          this.activeStops.push({ id: docSnap.id, data: DropOffDataModel.fromFirestore(docSnap.data()) });
        });
      }
    } catch (err) {
      console.error(err);
      alert('Error fetching stops: ' + err);
    } finally {
      this.loading = false;
    }
  }

  trackStopById(stopId: string) {
    this.router.navigate([`/${stopId}`]);
  }
}
