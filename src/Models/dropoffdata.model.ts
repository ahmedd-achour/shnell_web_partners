import * as L from 'leaflet';
import { timestamp } from 'rxjs';

export interface DropOffData {
  customerName?: string;
  customerPhoneNumber?: string;
  destination: L.LatLng;
  destinationName: string;

  isdelivered?: boolean;
}

export class DropOffDataModel implements DropOffData {
  constructor(
    public destination: L.LatLng,
    public destinationName: string,
    public customerName?: string,
    public customerPhoneNumber?: string,
    public isdelivered?: boolean
  ) {}

  toFirestore(): any {
    return {
      name: this.customerName,
      phoneNumber: this.customerPhoneNumber,
      destination: { latitude: this.destination.lat, longitude: this.destination.lng },
      destinationName: this.destinationName,
      isdelivered: this.isdelivered ,
      date : Date.now()
    };
  }

  static fromFirestore(data: any): DropOffDataModel {
    return new DropOffDataModel(
      new L.LatLng(data.destination.latitude, data.destination.longitude),
      data.destinationName,
      data.name,
      data.phoneNumber,
      data.isdelivered
    );
  }
}
