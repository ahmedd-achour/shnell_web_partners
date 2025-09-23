import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, DocumentData, doc, docData } from '@angular/fire/firestore';
import { Chart, registerables } from 'chart.js';
import { Auth, authState } from '@angular/fire/auth';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShnellUserModel, ShnellUser } from '../../Models/shnellUsers.models';
import { Deal } from '../../Models/deals.model';

Chart.register(...registerables);

interface DriverWithMissionStatus extends ShnellUser {
  id: string;
  hasActiveMission: boolean;
}

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.css']
})
export class HomeCompanyComponent implements OnInit, AfterViewInit, OnDestroy {

  totalDriversCount = 0;
  readyDriversCount = 0;
  inMissionCount = 0;
  offlineDriversCount = 0;

  drivers: DriverWithMissionStatus[] = [];
  filteredDrivers: DriverWithMissionStatus[] = [];
  searchTerm = '';

  pieChart: Chart | undefined;

  constructor(private firestore: Firestore, private auth: Auth) {}

  ngOnInit(): void {
    // Listen to auth state to get current company UID dynamically
    authState(this.auth).subscribe(user => {
      if (user?.uid) {
        this.loadCompanyDrivers(user.uid);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initDriverStatusChart();
  }

  ngOnDestroy(): void {
    if (this.pieChart) this.pieChart.destroy();
  }

  private loadCompanyDrivers(currentUserId: string): void {
    const usersRef = collection(this.firestore, 'users') as CollectionReference<DocumentData>;
    const dealsRef = collection(this.firestore, 'deals') as CollectionReference<DocumentData>;

    // Get current company document
    docData(doc(this.firestore, 'users', currentUserId)).subscribe(companyData => {
      if (!companyData) return;

      const company = ShnellUserModel.fromJson(companyData);

      if (!company.drivers || company.drivers.length === 0) return;

      // Get drivers that belong to this company
      const drivers$ = collectionData(usersRef, { idField: 'id' }).pipe(
        map(users =>
          users.filter(u => u['role'] === 'driver' && company.drivers.includes(u['id']))
        )
      );

      const deals$ = collectionData(dealsRef).pipe(
        map(data => data as Deal[])
      );

      combineLatest([drivers$, deals$]).subscribe(([companyDrivers, allDeals]) => {
        this.totalDriversCount = companyDrivers.length;

        const onlineDrivers = companyDrivers.filter((d: any) => d.isActive === true);

        this.drivers = onlineDrivers.map((driver: any) => {
          const hasActiveMission = allDeals.some(deal =>
            deal.idDriver === driver['id'] && (deal.status === 'accepted' || deal.status === 'almost')
          );
          return { ...driver, hasActiveMission } as DriverWithMissionStatus;
        });

        this.readyDriversCount = this.drivers.filter(d => !d.hasActiveMission).length;
        this.inMissionCount = this.drivers.filter(d => d.hasActiveMission).length;
        this.offlineDriversCount = companyDrivers.filter((d: any) => !d.isActive).length;

        this.filteredDrivers = [...this.drivers];
        this.updateDriverStatusChart();
      });
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

  private initDriverStatusChart(): void {
    const ctx = document.getElementById('driverStatusChart') as HTMLCanvasElement | null;
    if (!ctx) return;

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Ready', 'In Mission', 'Offline'],
        datasets: [{
          label: 'Driver Status',
          data: [1, 1, 1],
          backgroundColor: [
            'rgba(40, 167, 69, 0.7)',
            'rgba(0, 123, 255, 0.7)',
            'rgba(220, 53, 69, 0.7)'
          ],
          borderColor: [
            'rgba(40, 167, 69, 1)',
            'rgba(0, 123, 255, 1)',
            'rgba(220, 53, 69, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' as const } }
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
    event.target.src = 'img/default.png';
  }
}
