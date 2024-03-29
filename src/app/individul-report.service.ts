import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndividulReportService {
  private baseUrl = environment.baseURL;
  constructor(private http: HttpClient) {}

  getIndividualReport(
    Id: string,
    surveyId: string
  ): Observable<HttpResponse<Blob>> {
    return this.http.get(this.baseUrl + `/generatePdf/${Id}/${surveyId}`, {
      observe: 'response',
      responseType: 'blob',
    });
  }
  getSurveyReport(surveyName: string): Observable<HttpResponse<Blob>> {
    return this.http.get(this.baseUrl + `/api/getZipFile/${surveyName}`, {
      observe: 'response',
      responseType: 'blob',
    });
  }
}
