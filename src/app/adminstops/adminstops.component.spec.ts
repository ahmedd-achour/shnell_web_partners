import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstopsComponent } from './adminstops.component';

describe('AdminstopsComponent', () => {
  let component: AdminstopsComponent;
  let fixture: ComponentFixture<AdminstopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminstopsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminstopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
