import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonColor } from './shared/button-colors.enum';
import { buzzerSound } from '../assets/sounds';
import { SoundService } from './shared/sound-service.service';
import { DifficultyService, DifficultySetting } from './shared/difficulty.service';

/**
 * TODO
 * 4. Add difficult settings (slow, normal, fast, progressive)
 * 5. Add unit tests
 * 6. Add integration tests
 * 7. Add longer flash time on click
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title:string = 'simon';
  public failed:boolean = false;
  public sequence:ButtonColor[] = [];
  private currentInputIndex:number = 0;
  private buzzerSound:HTMLAudioElement = new Audio(buzzerSound);
  private soundTimeouts: any[] = [];

  public chirpSubject: Subject<ButtonColor> = new Subject();
  public difficultySettings = Object.keys(DifficultySetting);

  public redColor: ButtonColor = ButtonColor.red;
  public blueColor: ButtonColor = ButtonColor.blue;
  public greenColor: ButtonColor = ButtonColor.green;
  public yellowColor: ButtonColor = ButtonColor.yellow;
  public muteText:string = "Mute";

  constructor(private soundService: SoundService, private difficultyService: DifficultyService) { }

  public startGame():void {
    this.stopSequence(this.soundTimeouts);
    this.sequence = [];
    this.failed = false;
    this.currentInputIndex = 0;
    this.sequence = this.addSequenceItem(this.sequence);
    this.playSequence(this.sequence, this.chirpSubject);
  }

  public handleButtonClick(color:ButtonColor):void {
    const validInput = this.isUserInputValid(this.currentInputIndex, this.sequence, color);

    //User clicked the correct button, increment index OR reset index and add item to sequence
    if (validInput) { 
      this.currentInputIndex++;
      if (this.currentInputIndex === this.sequence.length) {
        this.currentInputIndex = 0;
        this.sequence = this.addSequenceItem(this.sequence);
        this.playSequence(this.sequence, this.chirpSubject);
      }
    } 
    
    //User clicked the wrong button, reset state then restart the game after a couple seconds of failed state
    else {
      this.stopSequence(this.soundTimeouts);
      this.sequence = [];
      this.failed = true;
      if (!this.soundService.appMuted) {
        this.buzzerSound.play();
      }
    }
  }

  private addSequenceItem(sequence:ButtonColor[]):ButtonColor[] {
    const myNumber = Math.floor(Math.random() * Math.floor(4));
    let newSequence = sequence.slice();
    switch (myNumber) {
      case 0:
        newSequence.push(ButtonColor.red);
        break;
      case 1:
        newSequence.push(ButtonColor.blue);
        break;
      case 2:
        newSequence.push(ButtonColor.yellow);
        break;
      case 3:
        newSequence.push(ButtonColor.green);
        break;
    }
    return newSequence;
  }

  private isUserInputValid(index:number, sequence:ButtonColor[], userInput:ButtonColor):boolean {
    const isValid = userInput === sequence[index];
    return isValid;
  }

  private playSequence(sequence: ButtonColor[], colorSubject: Subject<ButtonColor>):void {
    sequence.forEach((color:ButtonColor, index:number) => {
      let waitTime = (index + 1) * this.difficultyService.getDifficultySpeeds().chirpInterval;
      this.soundTimeouts.push( setTimeout(() => {colorSubject.next(color)}, waitTime) );
    });
  }

  private stopSequence(timeoutIds: any[]) {
    timeoutIds.forEach((id) => {
      clearTimeout(id);
    })
  }

  public toggleMute() {
    this.soundService.appMuted ? this.soundService.unmuteApp() : this.soundService.muteApp();
    this.muteText = this.soundService.appMuted ? "Unmute" : "Mute";
  }

  public updateDifficulty(event:Event):void {
    let selectedOption = event.target as HTMLInputElement;
    this.difficultyService.setDifficultySetting(selectedOption.value as DifficultySetting);
  }

}
