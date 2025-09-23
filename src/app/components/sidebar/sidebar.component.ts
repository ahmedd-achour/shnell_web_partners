import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ShnellUserModel } from '../../../Models/shnellUsers.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: ShnellUserModel | null = null;
  navItems: { label: string, path: string }[] = [];
  sidebarCollapsed = false;
  unauthorizedMessage: string | null = null;

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to Firebase Auth changes
    this.auth.onAuthStateChanged(firebaseUser => {
      if (!firebaseUser) {
        this.user = null;
        this.unauthorizedMessage = 'Please log in to access the dashboard';
        return;
      }

      // Fetch user document from Firestore
      const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
      docData(userDocRef).subscribe(data => {
        if (!data) {
          this.user = null;
          this.unauthorizedMessage = 'User data not found';
          return;
        }

        this.user = ShnellUserModel.fromJson(data);

        // Role-based navigation
        if (this.user.role === 'company') {
          this.navItems = [
            { label: 'Driver Management', path: 'home-company' },
            { label: 'Parcel Management', path: 'parcel-management' },
            { label: 'Stops Management', path: 'stops-management' },
            { label: 'Live Map & Data', path: 'live-map' },
            { label: 'Analytics & Performance', path: 'analytics' },
            { label: 'Retour & Payment Management', path: 'retour-payment' },
            { label: 'Profile', path: 'profile' }
          ];
          this.unauthorizedMessage = null;
        } else if (this.user.role === 'admin') {
          this.navItems = [
            { label: 'Admin Dashboard', path: 'home-admin' },
            { label: 'Parcel Management', path: 'parcel-management' },
            { label: 'Stops Management', path: 'stops-management' },
            { label: 'Live Map & Data', path: 'live-map' },
            { label: 'Analytics & Performance', path: 'analytics' },
            { label: 'Profile', path: 'profile' }
          ];
          this.unauthorizedMessage = null;
        } else {
        this.auth.signOut().then(() => {
          this.router.navigate(['/sign-in']); // redirect to login
        });}
      });
    });
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
