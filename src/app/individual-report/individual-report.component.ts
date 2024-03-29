import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IndividulReportService } from '../individul-report.service';
import { ProgressLoaderService } from '../progress-loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { SurveyService } from '../survey.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-individual-report',
  templateUrl: './individual-report.component.html',
  styleUrls: ['./individual-report.component.scss'],
})
export class IndividualReportComponent {
  @ViewChild('surveyname') imageInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  responseMessage!: string;
  empId = '';
  surveyName = '';
  isLoading = false;
  uploadSuccess: boolean = false;
  typeOfReport = '';
  surveyNm: string | undefined;

  constructor(
    private individualReportService: IndividulReportService,
    private surveyService: SurveyService,
    public progressService: ProgressLoaderService,
    public dialog: MatDialog
  ) {}
  changeReport() {
    this.surveyNm = sessionStorage.getItem('surveyName')?.toString().trim();
    console.log('in report survey name is :' + this.surveyNm);
  }
  uploadFile() {
    this.isLoading = true;
    this.progressService.sharedata = this.isLoading;
    if (this.typeOfReport === 'Individual') {
      if (this.empId && this.surveyName) {
        this.individualReportService
          .getIndividualReport(this.empId, this.surveyName)
          .subscribe(
            (response) => {
              this.downloadData(response);
            },
            (error) => {
              console.error('File not Found! Please try again later', error);
              const errorMessage = error.message;
              this.responseMessage = 'File not Found! Please try again later';
              this.openDialog();
              this.resetForm();
            }
          )
          .add(() => {
            this.isLoading = false;
            this.progressService.sharedata = this.isLoading;
          });
      }
    } else if (this.typeOfReport === 'Survey') {
      if (this.surveyNm) {
        this.individualReportService
          .getSurveyReport(this.surveyNm)
          .subscribe(
            (response) => {
              this.downloadData(response);
            },
            (error) => {
              console.error('Error saving Data', error);
              this.responseMessage = 'File not Found! Please try again later';
              this.openDialog();
              this.resetForm();
            }
          )
          .add(() => {
            this.isLoading = false;
            this.progressService.sharedata = this.isLoading;
          });
      }
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { message: this.responseMessage },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  resetForm(): void {
    this.empId = '';
    this.surveyName = '';
    this.uploadSuccess = false;
  }
  downloadData(response: HttpResponse<Blob>) {
    let fileNameHeader = response.headers.get('content-disposition');
    console.log('content-disposition: ' + fileNameHeader);
    // let fileName = fileNameHeader
    //   ? fileNameHeader.split(';')[1].split('=')[1]
    //   : 'defaultFileName';
    let fileNameMatch = fileNameHeader ? fileNameHeader.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/) : null;
  let fileName = fileNameMatch ? fileNameMatch[1] : 'defaultFileName';
  fileName = fileName.trim().replace(/["']/g, ''); 
    console.log('filename' + fileName);
    let blob: Blob = response.body as Blob;
    let a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    a.click();
    this.uploadSuccess = true;
    this.resetForm();
  }
}
