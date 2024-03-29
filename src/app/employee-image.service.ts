import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeImageService {

  private baseUrl = environment.baseURL;
  private apiUrl =`${this.baseUrl}/api/employee/saveImageFromZip`;

  constructor(private http: HttpClient) {}

  saveSurveyDetails(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }


}
