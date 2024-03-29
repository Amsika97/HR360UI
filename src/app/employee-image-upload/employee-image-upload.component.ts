import { Component, ElementRef, ViewChild } from '@angular/core';

import { EmployeeImageService } from '../employee-image.service';
import { ProgressLoaderService } from '../progress-loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-employee-image-upload',
  templateUrl: './employee-image-upload.component.html',
  styleUrls: ['./employee-image-upload.component.scss'],
})
export class EmployeeImageUploadComponent {
  @ViewChild('Image') imageInput!: ElementRef<HTMLInputElement>;
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
    private employeeimageService: EmployeeImageService,
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
      const validMimeTypes = [
        'application/zip',
        'application/x-zip-compressed',
      ];

      if (validMimeTypes.includes(this.selectedFile.type)) {
        console.log('file type: ' + this.selectedFile.type);
        currentFile.fileName = this.selectedFile.name;
        currentFile.buttonName = 'Replace Image';
      } else {
        currentFile.errorMessage = 'Please select a valid zip file.';
      }
    } else {
      console.error(`File input is not defined.`);
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      const currentFile = this.fileDetails ?? {
        fileName: '',
        buttonName: '',
        errorMessage: '',
      };
      this.isLoading = true;
      this.progressService.sharedata = this.isLoading;

      this.employeeimageService
        .saveSurveyDetails(formData)
        .subscribe(
          (response) => {
            if (response.error.length == 0) {
              this.uploadSuccess = true;
              this.responseMessage =
                'Employee Images Saved Successfully';
            } else {
              this.uploadSuccess = true;
              this.responseMessage = 'Error in saving ' + response.error;
            }

            this.openDialog();
            this.resetForm();
          },
          (error) => {
            console.error('Error saving employee image:', error);
            // currentFile.errorMessage = 'Error uploading file. Please try again.';
            this.responseMessage = 'Cannot save image of employee to server.';
            this.openDialog();
            this.resetForm();
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
    if (index === 0 && this.imageInput) {
      this.imageInput.nativeElement.click();
    }
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
}
