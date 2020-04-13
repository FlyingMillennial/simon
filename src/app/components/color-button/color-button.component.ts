import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ButtonColor } from 'src/app/shared/button-colors.enum';

@Component({
  selector: 'app-color-button',
  templateUrl: './color-button.component.html',
  styleUrls: ['./color-button.component.scss']
})
export class ColorButtonComponent implements OnInit {

/**
 * Todo
 * x. should accept a color as an input
 * x. color should be an enum
 * x. should have an eventEmitter/output pair to say it's been clicked
 * x. should be a <button>
 * x. should be a big square the color of it's color input
 * 6. should flash a brighter shade of its color when clicked
 * 7. should make a noise when clicked
 * 8. should be able to become solid red by some means
 * 9. Needs to have a way to know via user input (click) to flash OR via app input (sequence) to flash
 */

  @Input() color:ButtonColor;
  @Output() clicked:EventEmitter<ButtonColor> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked(color:ButtonColor):void {
    this.clicked.emit(color);
  }

}
