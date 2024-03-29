import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ScoreHistoryService {
  private baseUrl = environment.baseURL;
  private apiUrl = `${this.baseUrl}/api/absoluteScoreDetails/saveAbsoluteScoreDetails`;

  constructor(private http: HttpClient) {}

  saveSurveyDetails(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  // downloadFile(data: any) {
  //   return this.http.get<any>(
  //     this.baseUrl + `/api/absoluteScoreDetails/downloadFile?tableName=${data}`
  //   );
  // }

  downloadFile(data: any): Observable<HttpResponse<Blob>> {
    return this.http.get(
      this.baseUrl + `/api/absoluteScoreDetails/downloadFile?tableName=${data}`,
      {
        observe: 'response',
        responseType: 'blob',
      }
    );
  }
}
