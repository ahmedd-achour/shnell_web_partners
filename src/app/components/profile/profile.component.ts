import { Component, inject, OnInit } from '@angular/core';
import { Auth, User, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, arrayRemove, arrayUnion, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ShnellUserModel } from '../../../Models/shnellUsers.models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);
  private firestore = inject(Firestore);

  user: User | null = null;
  profile$!: Observable<ShnellUserModel | undefined>;

  ngOnInit() {
    this.user = this.auth.currentUser;

    if (this.user) {
      const userDoc = doc(this.firestore, `users/${this.user.uid}`);
      this.profile$ = docData(userDoc) as Observable<ShnellUserModel>;
    }
  }

  async onSignOut() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/sign-in']);
    } catch (err) {
      console.error('Error occurred during logout:', err);
    }
  }

  async addDriver(driverId: string) {
    if (!this.user || !driverId.trim()) return;

    const userDocRef = doc(this.firestore, `users/${this.user.uid}`);
    const driverDocRef = doc(this.firestore, `users/${driverId}`);

    try {
      const driverSnap = await getDoc(driverDocRef);
      if (!driverSnap.exists()) {
        alert('❌ Driver not found in system');
        return;
      }

      const driverData = driverSnap.data() as ShnellUserModel;
      if (driverData.role !== 'driver') {
        alert('❌ This user is not registered as a driver');
        return;
      }

      const companySnap = await getDoc(userDocRef);
      if (!companySnap.exists()) {
        alert('❌ Company profile not found');
        return;
      }

      const companyData = companySnap.data() as ShnellUserModel;

      if (companyData.drivers?.includes(driverId)) {
        alert('⚠️ Driver already added to your company');
        return;
      }

      await updateDoc(userDocRef, {
        drivers: arrayUnion(driverId)
      });

      alert('✅ Driver added successfully');
    } catch (err) {
      console.error('Error adding driver:', err);
      alert('❌ Something went wrong while adding the driver');
    }
  }

  // ✅ Remove driver function
  async removeDriver(driverId: string) {
    if (!this.user || !driverId) return;

    const userDocRef = doc(this.firestore, `users/${this.user.uid}`);

    try {
      const companySnap = await getDoc(userDocRef);
      if (!companySnap.exists()) {
        alert('❌ Company profile not found');
        return;
      }

      const companyData = companySnap.data() as ShnellUserModel;

      if (!companyData.drivers?.includes(driverId)) {
        alert('⚠️ Driver not found in your company');
        return;
      }

      await updateDoc(userDocRef, {
        drivers: arrayRemove(driverId)
      });

      alert('✅ Driver removed successfully');
    } catch (err) {
      console.error('Error removing driver:', err);
      alert('❌ Something went wrong while removing the driver');
    }
  }
}
