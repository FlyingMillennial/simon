import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ButtonColor } from './shared/button-colors.enum';
import { Subject } from 'rxjs';

/**
 * TODO
 * 1. Play color sequence to user at the start of each turn
 *  - App component needs to be able to tell the button components to chirp
 *  - Could use a subject passed as an input to the color-buttons that tells them to chirp
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public title:string = 'simon';
  public failed:boolean = false;
  private sequence:ButtonColor[] = [];
  private currentInputIndex:number = 0;

  public chirpSubject: Subject<ButtonColor> = new Subject(); 

  public redColor: ButtonColor = ButtonColor.red;
  public blueColor: ButtonColor = ButtonColor.blue;
  public greenColor: ButtonColor = ButtonColor.green;
  public yellowColor: ButtonColor = ButtonColor.yellow;

  ngAfterViewInit():void {
    this.startGame();
  }

  private startGame():void {
    this.failed = false;
    this.currentInputIndex = 0;
    this.sequence = this.addSequenceItem(this.sequence);
    this.playSequence(this.sequence, this.chirpSubject);
    console.log(this.sequence);
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
        console.log(this.sequence);
      }
    } 
    
    //User clicked the wrong button, reset state then restart the game after a couple seconds of failed state
    else { 
      this.sequence = [];
      this.failed = true;
      setTimeout(() => {
        this.startGame();
      }, 2000);
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
      let waitTime = (index + 1) * 600;
      setTimeout(() => {
        colorSubject.next(color);
      }, waitTime)
    });
  }

}
