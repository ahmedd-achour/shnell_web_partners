import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as L from 'leaflet';
import { DropOffDataModel } from '../../Models/dropoffdata.model';
interface StopView {
  id: string;
  customerName: string;
  phone?: string; // optional
  destinationName: string;
  isDelivered: boolean | null;
  trackingAvailable: boolean | null;
  date: Date | null;
}
@Component({
  selector: 'app-adminstops',
  templateUrl: './adminstops.component.html',
  styleUrl: './adminstops.component.css'
})


export class AdminstopsComponent implements OnInit {
searchTerm = '';
  statusFilter: 'all' | 'pending' | 'notDelivered' | 'delivered' = 'all';
  minDate: string = '';
  maxDate: string = '';

  allStops: StopView[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const stopsRef = collection(this.firestore, 'stops');
    collectionData(stopsRef, { idField: 'id' })
      .pipe(
        map(docs =>
          docs.map((doc: any) => {
            const model = DropOffDataModel.fromFirestore(doc);
            const stopDate = doc.date ? new Date(doc.date) : null;

            const within72h =
              stopDate &&
              (Date.now() - stopDate.getTime()) <= 72 * 60 * 60 * 1000;

            const trackingAvailable =
              model.isdelivered == null && within72h;

            return {
              id: doc.id,
              customerName: model.customerName || 'Unknown',
              phone: model.customerPhoneNumber,
              destinationName: model.destinationName,
              isDelivered: model.isdelivered ?? null,
              trackingAvailable,
              date: stopDate
            };
          })
        )
      )
      .subscribe(stops => {
        this.allStops = stops;
      });
  }

  applyFilters(): StopView[] {
    return this.allStops.filter(stop => {
      // phone filter
      const matchesPhone = this.searchTerm
        ? stop.phone?.includes(this.searchTerm)
        : true;

      // status filter
      let matchesStatus = true;
      if (this.statusFilter === 'pending') matchesStatus = stop.isDelivered === null;
      if (this.statusFilter === 'notDelivered') matchesStatus = stop.isDelivered === false;
      if (this.statusFilter === 'delivered') matchesStatus = stop.isDelivered === true;

      // date filter
     let matchesDate: boolean = true;

if (this.minDate) {
  matchesDate =
    matchesDate &&
    !!(stop.date && stop.date >= new Date(this.minDate));
}

if (this.maxDate) {
  matchesDate =
    matchesDate &&
    !!(stop.date && stop.date <= new Date(this.maxDate));
}


      return matchesPhone && matchesStatus && matchesDate;
    });
  }

  onTrack(stopId: string): void {
    console.log('Tracking stop', stopId);
  }
}

