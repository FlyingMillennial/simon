import { Component, OnInit } from '@angular/core';
import { ButtonColor } from './shared/button-colors.enum';

/**
 * TODO:
 * x. Hold on to a sequence of colors
 * x. Add a random color
 * 3. clear out the colors
 * 4. hold on to an number of inputs received
 * 5. use a coloroutput from a button in concert with the inputsReceived value to check validity of an input
 * 6. place app in a failing state if input is incorrect
 * 7. reset to zero state
 */



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title:string = 'simon';
  public failed:boolean = false;
  private sequence:ButtonColor[] = [];
  private currentInputIndex:number = 0;

  public redColor: ButtonColor = ButtonColor.red;
  public blueColor: ButtonColor = ButtonColor.blue;
  public greenColor: ButtonColor = ButtonColor.green;
  public yellowColor: ButtonColor = ButtonColor.yellow;

  ngOnInit():void {
    this.startGame();
  }

  private startGame():void {
    this.failed = false;
    this.sequence = this.addSequenceItem(this.sequence);
    console.log(this.sequence);
  }

  public handleButtonClick(color:ButtonColor):void {
    const validInput = this.isUserInputValid(this.currentInputIndex, this.sequence, color);
    if (validInput) {
      this.currentInputIndex++;
      if (this.currentInputIndex === this.sequence.length) {
        this.currentInputIndex = 0;
        this.sequence = this.addSequenceItem(this.sequence);
        console.log(this.sequence);
      }
    } else {
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

}
