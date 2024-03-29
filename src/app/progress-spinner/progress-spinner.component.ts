import { Component } from '@angular/core';
import { ProgressLoaderService } from '../progress-loader.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent {

  constructor(public service: ProgressLoaderService){

  }

  
}
