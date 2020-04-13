import { Component } from '@angular/core';
import { ButtonColor } from './shared/button-colors.enum';

/**
 * TODO:
 * 1. Hold on to a sequence of colors
 * 2. Add a random color
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
export class AppComponent {
  title:string = 'simon';
  failed:boolean = false;

  redColor: ButtonColor = ButtonColor.red;
  blueColor: ButtonColor = ButtonColor.blue;
  greenColor: ButtonColor = ButtonColor.green;
  yellowColor: ButtonColor = ButtonColor.yellow;

  handleButtonClick(color:ButtonColor):void {
    console.log(`Clicked the ${color} button!  Handled by AppComponent`);
  }

}
