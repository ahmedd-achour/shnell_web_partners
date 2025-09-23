import * as L from 'leaflet'; // or import { LatLng } from 'leaflet'

export interface Order {
  price: number;
  distance: number;
  namePickUp: string;
  pickUpLocation: L.LatLng;
  stops: string[];
  vehicleType: string;
  userId: string;
  isInstantDelivery?: boolean;
  additionalInfo?: any;
  isAccepted?: boolean;
}

export class OrderModel implements Order {
  constructor(
    public price: number,
    public distance: number,
    public namePickUp: string,
    public pickUpLocation: L.LatLng,
    public stops: string[],
    public vehicleType: string,
    public userId: string,
    public isInstantDelivery: boolean = false,
    public additionalInfo?: any,
    public isAccepted: boolean = false
  ) {}

  toJson(): any {
    return {
      userID: this.userId,
      price: this.price,
      distance: this.distance,
      namePickUp: this.namePickUp,
      pickUpLocation: { lat: this.pickUpLocation.lat, lng: this.pickUpLocation.lng },
      stops: this.stops,
      vehicleType: this.vehicleType,
      isInstantDelivery: this.isInstantDelivery,
      additionalInfo: this.additionalInfo,
      isAccepted: this.isAccepted,
      timestamp: new Date()
    };
  }
}
