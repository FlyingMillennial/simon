import { Component } from '@angular/core';
import { ButtonColor } from './shared/button-colors.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simon';

  //Button Colors
  redColor: ButtonColor = ButtonColor.red;
  blueColor: ButtonColor = ButtonColor.blue;
  greenColor: ButtonColor = ButtonColor.green;
  yellowColor: ButtonColor = ButtonColor.yellow;
}