import { TestBed } from '@angular/core/testing';

import { IndividulReportService } from './individul-report.service';

describe('IndividulReportService', () => {
  let service: IndividulReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividulReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
