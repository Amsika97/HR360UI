import { Component, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';
import { SurveyService } from '../survey.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProgressLoaderService } from '../progress-loader.service';
@Component({
  selector: 'app-survey-upload',
  templateUrl: './survey-upload.component.html',
  styleUrls: ['./survey-upload.component.scss'],
})
export class SurveyUploadComponent {
  @ViewChild('Managers') managersInput!: ElementRef<HTMLInputElement>;
  @ViewChild('Peer') peerInput!: ElementRef<HTMLInputElement>;
  @ViewChild('Seff') seffInput!: ElementRef<HTMLInputElement>;
  @ViewChild('Reportees') reporteesInput!: ElementRef<HTMLInputElement>;

  constructor(
    private surveyService: SurveyService,
    public dialog: MatDialog,
    public progressService: ProgressLoaderService
  ) {}

  files = [
    {
      id: 'Managers',
      fileName: '',
      buttonName: '',
      isFileSelected: false,
      errorMessage: '',
    },
    {
      id: 'Peer',
      fileName: '',
      buttonName: '',
      isFileSelected: false,
      errorMessage: '',
    },
    {
      id: 'Seff',
      fileName: '',
      buttonName: '',
      isFileSelected: false,
      errorMessage: '',
    },
    {
      id: 'Reportees',
      fileName: '',
      buttonName: '',
      isFileSelected: false,
      errorMessage: '',
    },
  ];

  storedFiles: any = []; //added 1

  uploadSuccess: boolean = false;

  responseMessage!: string;

  isLoading = false;

  onFileSelected(event: any, index: number) {
    const selectedFile = event.target.files[0];

    const currentFile = this.files[index];
    console.log(currentFile);
    if (currentFile) {
      if (
        selectedFile &&
        selectedFile.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        currentFile.fileName = selectedFile.name;
        const existingIndex = this.storedFiles.findIndex(
          (file: { index: number }) => file.index === index
        );

        if (existingIndex !== -1) {
          this.storedFiles[existingIndex] = {
            index,
            selectedFile,
            fileName: currentFile.fileName,
          };
        } else {
          this.storedFiles.push({
            index,
            selectedFile,
            fileName: currentFile.fileName,
          });
        }

        currentFile.buttonName = 'Replace File';
        currentFile.isFileSelected = true;
        currentFile.errorMessage = '';

        const fileNames = this.storedFiles.map(
          (file: { fileName: any }) => file.fileName
        );
        console.log('Stored File Names:', fileNames);
      } else {
        currentFile.errorMessage = 'Please select a valid Excel file.';
      }
    } else {
      console.error(`File input at index ${index} is not defined.`);
    }
  }

  uploadFile(index: number, event?: any) {
    const filetoupload = this.storedFiles;
    const formData = new FormData();

    for (const file of filetoupload) {
      formData.append('files', file.selectedFile, file.fileName);
    }

    this.isLoading = true;
    this.progressService.sharedata = this.isLoading;

    this.surveyService
      .saveSurveyDetails(formData)
      .subscribe(
        (response) => {
          console.log('Survey details saved successfully:', response);
          if (response['error'] == '' || !response['error']) {
            this.uploadSuccess = true;
            this.responseMessage = response.success;
            let data = response.success.toString().split('- ')[1];
            sessionStorage.setItem('surveyName', data);
            console.log('in survey upload setting surveyname is : ' + data);
            this.openDialog();
            this.resetForm();
          } else {
            const errorOutput = response['error'];
            this.responseMessage = errorOutput;
            this.openDialog();
            this.resetForm();
          }
        },
        (error) => {
          this.responseMessage = 'Error uploading file. Please try again.';
          this.openDialog();
          this.resetForm();
        }
      )
      .add(() => {
        this.isLoading = false;
        this.progressService.sharedata = this.isLoading;
      });
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

  triggerFileInputClick(index: number) {
    if (index === 0 && this.managersInput) {
      this.managersInput.nativeElement.click();
    } else if (index === 1 && this.peerInput) {
      this.peerInput.nativeElement.click();
    } else if (index === 2 && this.seffInput) {
      this.seffInput.nativeElement.click();
    } else if (index === 3 && this.reporteesInput) {
      this.reporteesInput.nativeElement.click();
    }
  }

  allFilesSelected(): boolean {
    return this.files.every((file) => file.isFileSelected);
  }
  resetForm(): void {
    this.files.forEach((file) => {
      file.fileName = '';
      file.buttonName = '';
      file.isFileSelected = false;
      file.errorMessage = '';
    });

    this.uploadSuccess = false;
  }
}
