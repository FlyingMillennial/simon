import { Injectable } from '@angular/core';

export enum DifficultySetting {
  easy = "easy",
  normal = "normal",
  hard = "hard",
  hardest = "hardest"
}

export interface SpeedModel {
  chirpSpeed:number,
  chirpInterval:number,
  flashDuration: number
}

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {

  private difficutly:DifficultySetting = DifficultySetting.normal;

  private easySpeeds:SpeedModel = {chirpSpeed: 800, chirpInterval: 1000, flashDuration: 400};
  private normalSpeeds:SpeedModel = {chirpSpeed: 600, chirpInterval: 800, flashDuration: 400};
  private hardSpeeds:SpeedModel = {chirpSpeed: 400, chirpInterval: 600, flashDuration: 400};
  private hardestSpeeds:SpeedModel = {chirpSpeed: 150, chirpInterval: 250, flashDuration: 200};

  public getDifficultySetting():DifficultySetting {
    return this.difficutly;
  }

  public setDifficultySetting(difficulty:DifficultySetting):void {
    this.difficutly = difficulty;
  }

  public getDifficultySpeeds():SpeedModel {
    switch(this.difficutly) {
      case DifficultySetting.easy:
        return this.easySpeeds;
        break;
      case DifficultySetting.normal:
        return this.normalSpeeds;
        break;
      case DifficultySetting.hard:
        return this.hardSpeeds;
        break;
      case DifficultySetting.hardest:
        return this.hardestSpeeds;
        break;
    }
  }

}
