import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAdminComponent } from './doctor-admin.component';

describe('DoctorAdminComponent', () => {
  let component: DoctorAdminComponent;
  let fixture: ComponentFixture<DoctorAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
