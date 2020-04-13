import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ButtonColor } from 'src/app/shared/button-colors.enum';
import { getSound } from 'src/app/shared/button-sounds';

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
 * x. should flash a brighter shade of its color when clicked
 * x. should make a noise when clicked
 * x. should be able to become solid red by some means
 * 9. Needs to have a way to know via user input (click) to flash OR via app input (sequence) to flash
 *  - sounds like a job for a service
 */

  @Input() color:ButtonColor;
  @Input() failed:boolean = false;
  @Output() clicked:EventEmitter<ButtonColor> = new EventEmitter();

  public cssClassObject:any;

  private getCssClassObject(color) {
    let cssClassObject = {};
    cssClassObject[color] = true;
    cssClassObject["lit"] = false;
    return cssClassObject;
  }

  constructor() { }

  ngOnInit():void {
    this.cssClassObject = this.getCssClassObject(this.color);
  }

  public buttonClicked(color:ButtonColor):void {
    this.playSound(color);
    this.clicked.emit(color);
  }

  public lightButton() {
    this.cssClassObject.lit = true;
  }

  public darkenButton() {
    this.cssClassObject.lit = false;
  }

  private playSound(color) {
    let sound = getSound(color);
    sound.play();
  }

}
