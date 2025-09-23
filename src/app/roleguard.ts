import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ShnellUserModel } from '../Models/shnellUsers.models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard  {
  constructor(private router: Router, private firestore: Firestore, private auth: Auth) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const user = this.auth.currentUser;
      if (!user) return this.router.createUrlTree(['/sign-in']);

      // Fetch user document from Firestore
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) return this.router.createUrlTree(['/sign-in']);

      const shnellUser = ShnellUserModel.fromJson(userSnap.data());

      // Check role
      const requiredRole = next.data['role'] as string;
      if (shnellUser.role === requiredRole) return true;

      // Redirect if role not matching
      return this.router.createUrlTree(['/home']);
    } catch (err) {
      console.error(err);
      return this.router.createUrlTree(['/sign-in']);
    }
  }
}
