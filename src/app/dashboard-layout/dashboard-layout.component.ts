import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard-layout',
  template: `
    <app-sidebar></app-sidebar>
    <div class="dashboard-content" *ngIf="user$ | async as user">
      <router-outlet></router-outlet>
    </div>
  `
})
export class DashboardLayoutComponent {
  user$ = this.afAuth.authState;
  constructor(private afAuth: AngularFireAuth) {}
}

