import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { Chart, registerables } from 'chart.js';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShnellUser } from '../../../Models/shnellUsers.models';
import { Deal } from '../../../Models/deals.model';


Chart.register(...registerables);

interface DriverWithMissionStatus extends ShnellUser {
  id: string;
  hasActiveMission: boolean;
}

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit, AfterViewInit, OnDestroy {

  // ---------------- Dashboard stats ----------------
  totalDriversCount = 0;
  readyDriversCount = 0;
  inMissionCount = 0;
  offlineDriversCount = 0;

  drivers: DriverWithMissionStatus[] = [];
  filteredDrivers: DriverWithMissionStatus[] = [];
  searchTerm = '';

  pieChart: Chart | undefined;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  ngAfterViewInit(): void {
    this.initDriverStatusChart();
  }

  ngOnDestroy(): void {
    if (this.pieChart) this.pieChart.destroy();
  }

  private loadAllData(): void {
    const usersRef = collection(this.firestore, 'users') as CollectionReference<DocumentData>;
    const dealsRef = collection(this.firestore, 'deals') as CollectionReference<DocumentData>;

    const usersWithIds$ = collectionData(usersRef, { idField: 'id' }).pipe(
      map(data => data.filter(u => u['role'] === 'driver') as any[])
    );
    const deals$ = collectionData(dealsRef).pipe(map(data => data as Deal[]));

    combineLatest([usersWithIds$, deals$]).subscribe(([allDrivers, allDeals]) => {
      this.totalDriversCount = allDrivers.length;

      const onlineDrivers = allDrivers.filter(u => u.isActive === true);
      this.drivers = onlineDrivers.map(driver => {
        const hasActiveMission = allDeals.some(deal =>
          deal.idDriver === driver['id'] && (deal.status === 'accepted' || deal.status === 'almost')
        );
        return { ...driver, hasActiveMission } as DriverWithMissionStatus;
      });

      this.readyDriversCount = this.drivers.filter(d => !d.hasActiveMission).length;
      this.inMissionCount = this.drivers.filter(d => d.hasActiveMission).length;
      this.offlineDriversCount = allDrivers.filter(d => !d.isActive).length;

      this.filteredDrivers = [...this.drivers];
      this.updateDriverStatusChart();
    });
  }

  public filterDrivers(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredDrivers = [...this.drivers];
      return;
    }
    this.filteredDrivers = this.drivers.filter(driver =>
      driver.name?.toLowerCase().includes(term) ||
      driver.phone?.toLowerCase().includes(term)
    );
  }

  // ---------------- Pie Chart ----------------
  private initDriverStatusChart(): void {
    const ctx = document.getElementById('driverStatusChart') as HTMLCanvasElement | null;
    if (!ctx) return;

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Ready', 'In Mission', 'Offline'],
        datasets: [{
          label: 'Driver Status',
          data: [0, 0, 0], // will update dynamically
        backgroundColor: [
  'rgba(40, 167, 69, 0.7)',    // Ready → Green
  'rgba(0, 123, 255, 0.7)',    // In Mission → Blue
  'rgba(220, 53, 69, 0.7)',    // Offline → Red
],
borderColor: [
  'rgba(40, 167, 69, 1)',
  'rgba(0, 123, 255, 1)',
  'rgba(220, 53, 69, 1)',
],

          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' as const },
        }
      }
    });
  }

  private updateDriverStatusChart(): void {
    if (!this.pieChart) return;
    this.pieChart.data.datasets[0].data = [
      this.readyDriversCount,
      this.inMissionCount,
      this.offlineDriversCount
    ];
    this.pieChart.update();
  }

  public onImgError(event: any): void {
    event.target.src = 'assets/img/default.png';
  }

}
