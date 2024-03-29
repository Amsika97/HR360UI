import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsUploadComponent } from './employee-details-upload.component';

describe('EmployeeDetailsUploadComponent', () => {
  let component: EmployeeDetailsUploadComponent;
  let fixture: ComponentFixture<EmployeeDetailsUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeDetailsUploadComponent]
    });
    fixture = TestBed.createComponent(EmployeeDetailsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
