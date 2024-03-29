import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyUploadComponent } from './survey-upload/survey-upload.component';
import { EmployeeDetailsUploadComponent } from './employee-details-upload/employee-details-upload.component';
import { EmployeeImageUploadComponent } from './employee-image-upload/employee-image-upload.component';
import { ScoreHistoryComponent } from './score-history/score-history.component';
import { IndividualReportComponent } from './individual-report/individual-report.component';
// { path: 'login', component: LoginViewComponent }
const routes: Routes = [
  { path: '', redirectTo: '/survey-upload', pathMatch: 'full' },
  { path: 'survey-upload', component: SurveyUploadComponent },
  {
    path: 'employee-details-upload',
    component: EmployeeDetailsUploadComponent,
  },
  { path: 'employee-image-upload', component: EmployeeImageUploadComponent },
  { path: 'score-history-upload', component: ScoreHistoryComponent },
  { path: 'generate-report', component: IndividualReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
