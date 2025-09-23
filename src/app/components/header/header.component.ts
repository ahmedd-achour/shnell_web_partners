import { Component } from '@angular/core';
interface NavItem {
  label: string;
  path: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
 navItems: NavItem[] = [
    { label: 'Home', path: '/home' },
    { label: 'About', path: '/about' },
    { label: 'Service', path: '/service' },
    { label: 'SignIn', path: '/sign-in' },
    { label: 'Drivers', path: '/single' }
  ];
}
