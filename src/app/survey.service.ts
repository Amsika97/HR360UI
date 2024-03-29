import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private baseUrl = environment.baseURL;
  private apiUrl =`${this.baseUrl}/api/surveyDetails/saveSurveyDetails`;
  private absScoreUrl =`${this.baseUrl}/api/surveyDetails/saveSurveyDetails`;
  private percentileUrl =`${this.baseUrl}/api/surveyDetails/saveSurveyDetails`;

  // surveyName=S1
  constructor(private http: HttpClient) {}

  // saveSurveyDetails(files: File[]): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, files);
  // }
  saveSurveyDetails(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  downloadAbsoluteScore(formData: FormData): Observable<any> {
    return this.http.get<any>(this.absScoreUrl);
  }

  downloadPercentile(formData: FormData): Observable<any> {
    return this.http.get<any>(this.percentileUrl);
  }
}
