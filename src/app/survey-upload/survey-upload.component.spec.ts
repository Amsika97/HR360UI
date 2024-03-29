import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyUploadComponent } from './survey-upload.component';

describe('SurveyUploadComponent', () => {
  let component: SurveyUploadComponent;
  let fixture: ComponentFixture<SurveyUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyUploadComponent]
    });
    fixture = TestBed.createComponent(SurveyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
