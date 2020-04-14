import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  public appMuted: boolean = false;
  
  constructor() { }

  public muteApp() {
    this.appMuted = true;
  }

  public unmuteApp() {
    this.appMuted = false;
  }

}
