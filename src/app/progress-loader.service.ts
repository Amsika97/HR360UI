import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressLoaderService {

  sharedata: any;

  setSharedData(value: any) {
    this.sharedata = value;
    console.log(this.sharedata);
  }
  constructor() { }
}
