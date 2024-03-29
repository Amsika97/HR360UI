import { Component, ElementRef, ViewChild } from '@angular/core';

import { EmployeeDetailsService } from '../employee-details.service';
import { ProgressLoaderService } from '../progress-loader.service';

import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-details-upload',
  templateUrl: './employee-details-upload.component.html',
  styleUrls: ['./employee-details-upload.component.scss'],
})
export class EmployeeDetailsUploadComponent {
  @ViewChild('employee') employeeInput!: ElementRef<HTMLInputElement>;
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
    private employeeService: EmployeeDetailsService,
    public progressService: ProgressLoaderService,
    public dialog: MatDialog
  ) {}

  onFileSelected(event: any) {
    // console.log("event: "+ event);
    this.selectedFile = event.target.files[0];

    // console.log("selectedFile: "+ this.selectedFile);
    this.fileDetails = {
      fileName: '',
      buttonName: '',
      errorMessage: '',
    };

    const currentFile = this.fileDetails;

    //  console.log("currentFile: "+ currentFile);

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
    console.log('Uploading');

    if (this.selectedFile) {
      console.log('Uploading: ' + this.selectedFile);

      const formData = new FormData();

      formData.append('multipartFile', this.selectedFile);

      const currentFile = this.fileDetails ?? {
        fileName: '',
        buttonName: '',
        errorMessage: '',
      };

      this.isLoading = true;
      this.progressService.sharedata = this.isLoading;
      this.employeeService
        .saveSurveyDetails(formData)
        .subscribe(
          (response) => {
            if (response['error'] == '' && response['success'] == '') {
              this.responseMessage =
                'File Format is not correct. Please update the file and try again.';
              this.openDialog();
            } else if (response['error'] == '') {
              this.uploadSuccess = true;
              this.responseMessage = 'Employee details saved successfully';
              this.openDialog();
            } else {
              const errorOutput = response['error'];
              this.responseMessage =
                'Error occur for employee with ID : ' +
                errorOutput +
                '. Please re-upload the file.';
              this.openDialog();
            }

            this.uploadSuccess = true;

            console.log('checking: ' + this.uploadSuccess);
            this.resetForm();
          },
          (error) => {
            console.error('Error saving employee details:', error);
            // currentFile.errorMessage = 'Error uploading file. Please try again.';
            this.responseMessage = 'Cannot connect to server.';
            this.openDialog();
          }
        )
        .add(() => {
          this.isLoading = false;
          this.progressService.sharedata = this.isLoading;
        });
    } else {
      console.error('No file selected for upload.');
      this.responseMessage = 'No file selected for uploading.';
      this.openDialog();
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

  triggerFileInputClick(index: number) {
    if (index === 0 && this.employeeInput) {
      this.employeeInput.nativeElement.click();
    }
  }

  resetForm() {
    this.fileDetails = {
      fileName: '',
      buttonName: '',
      errorMessage: '',
    };
    // this.fileDetails = null;
    this.uploadSuccess = false;
    this.selectedFile = null;
  }
}
