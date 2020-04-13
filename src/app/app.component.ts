import { Component } from '@angular/core';
import { ButtonColor } from './shared/button-colors.enum';

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
    alert(`Clicked the ${color} button!  Handled by AppComponent`);
  }

}
