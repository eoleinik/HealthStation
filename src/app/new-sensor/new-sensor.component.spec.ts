import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSensorComponent } from './new-sensor.component';

describe('NewSensorComponent', () => {
  let component: NewSensorComponent;
  let fixture: ComponentFixture<NewSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
