import { Component, ElementRef, ViewChild } from '@angular/core';
import { ScoreHistoryService } from '../score-history.service';
import { ProgressLoaderService } from '../progress-loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-score-history',
  templateUrl: './score-history.component.html',
  styleUrls: ['./score-history.component.scss'],
})
export class ScoreHistoryComponent {
  @ViewChild('Score') scoreInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;

  fileDetails: {
    fileName: string;
    buttonName: string;
    errorMessage: string;
  } | null = null;

  isLoading = false;
  uploadSuccess: boolean = false;
  responseMessage!: string;

  constructor(
    private scorehistoryService: ScoreHistoryService,
    public progressService: ProgressLoaderService,
    public dialog: MatDialog
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    console.log('selectedFile: ' + this.selectedFile);
    this.fileDetails = {
      fileName: '',
      buttonName: '',
      errorMessage: '',
    };

    const currentFile = this.fileDetails;

    console.log('currentFile: ' + currentFile);

    if (this.selectedFile) {
      if (
        this.selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        currentFile.fileName = this.selectedFile.name;
        currentFile.buttonName = 'Replace File';
      } else {
        currentFile.errorMessage = 'Please select a valid Excel file.';
      }
    } else {
      console.error(`File input is not defined.`);
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('multipartFile', this.selectedFile);

      const currentFile = this.fileDetails ?? {
        fileName: '',
        buttonName: '',
        errorMessage: '',
      };

      this.isLoading = true;
      this.progressService.sharedata = this.isLoading;

      this.scorehistoryService
        .saveSurveyDetails(formData)
        .subscribe(
          (response) => {
            this.uploadSuccess = true;
            this.responseMessage = response.message;
            this.openDialog();
            this.resetForm();
          },
          (error) => {
            this.responseMessage = 'Cannot save Details to server.';
            this.openDialog();
            this.resetForm();
          }
        )
        .add(() => {
          this.isLoading = false;
          this.progressService.sharedata = this.isLoading;
        });
    }else {
      console.error('No file selected for upload.');
      this.responseMessage = 'No file selected for uploading.';
      this.openDialog();
    }
  }

  triggerFileInputClick(index: number) {
    if (index === 0 && this.scoreInput) {
      this.scoreInput.nativeElement.click();
    }
  }
  // downloadFile(data: any) {
  //   this.scorehistoryService.downloadFile(data).subscribe(
  //     (response) => {
  //       console.log('File Downloaded Successfully', response);
  //       this.uploadSuccess = true;
  //     },
  //     (error) => {
  //       console.error('Error Downloading the file', error);
  //     }
  //   );
  // }

  downloadFile(data: any) {
    this.scorehistoryService.downloadFile(data).subscribe(
      (response) => {
        let fileNameHeader = response.headers.get('content-disposition');
        let fileName = fileNameHeader
          ? fileNameHeader.split(';')[1].split('=')[1]
          : 'defaultFileName';

        let blob: Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
        console.log('File Downloaded Successfully', response);
        this.uploadSuccess = true;
      },
      (error) => {
        console.error('Error Downloading the file', error);
      }
    );
  }

  resetForm(): void {
    this.fileDetails = {
      fileName: '',
      buttonName: '',
      errorMessage: '',
    };

    this.uploadSuccess = false;
    this.selectedFile = null;
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
}
