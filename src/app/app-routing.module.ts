import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { UserResolver } from './services/user.resolver';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { SingleComponent } from './components/single/single.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ParcelManagementComponent } from './components/parcel-management/parcel-management.component';
import { StopsManagementComponent } from './components/stops-management/stops-management.component';
import { LiveMapComponent } from './components/live-map/live-map.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { PartnerdashComponent } from './components/partnerdash/partnerdash.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { RetourspaymentsComponent } from './components/retourspayments/retourspayments.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { HomeCompanyComponent } from './home-company/home-company.component';
import { DeliveryTrackingComponent } from './delivery-tracking/delivery-tracking.component';
import { AdminstopsComponent } from './adminstops/adminstops.component';

const redirectToLogin = () => redirectUnauthorizedTo('/sign-in');

const routes: Routes = [
  // Default route

  { path: '', redirectTo: '/home', pathMatch: 'full' },



  // we wanna display the header , <route> , footer if no login is hapened , and solve the dashboard internal page reload problem
  // app-header , and app-footer
  // Public pages





{
  path: '',
  component: PublicLayoutComponent,
  children: [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'welcome', component: WelcomePageComponent },

    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'service', component: ServiceComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'single', component: SingleComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    {
      path : 'admin-stops' , component: AdminstopsComponent
    },


  ]
},



  // Auth pages
    { path: 'sign-up', component: SignUpComponent },
    { path: 'sign-in/forgot-password', component: ForgotPasswordComponent },



  // Dashboard with sidebar
  {
    path: '',
    component: SidebarComponent, // sidebar stays visible
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToLogin },
    resolve: { user: UserResolver },
    children: [

      { path: 'home-admin', component: HomeAdminComponent },
      { path: 'parcel-management', component: ParcelManagementComponent },
      { path: 'stops-management', component: StopsManagementComponent },
      { path: 'live-map', component: LiveMapComponent },
      { path: 'home-company', component: HomeCompanyComponent },

      { path: 'analytics', component: AnalyticsComponent },
      { path: 'profile', component: ProfileComponent } ,
      { path: 'corier-dash', component: PartnerdashComponent },
      { path: 'home-company/driver-details/:id', component: DriverDetailsComponent },
      { path: 'retour-payment', component: RetourspaymentsComponent },
                { path: 'parcel-management/:stopID', component: DeliveryTrackingComponent },

      // Default child route
      { path: '', redirectTo: 'home-company', pathMatch: 'full' },

    ]
  },


          { path: ':stopID', component: DeliveryTrackingComponent },


  // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
