import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-button',
  templateUrl: './color-button.component.html',
  styleUrls: ['./color-button.component.scss']
})
export class ColorButtonComponent implements OnInit {

/**
 * Todo
 * 1. should accept a color as an input
 * 2. color should be an enum
 * 3. should have an eventEmitter/output pair to say it's been clicked
 * 4. should be a <button>
 * 5. should be a big square the color of it's color input
 * 6. should flash a brighter shade of its color when clicked
 * 7. should make a noise when clicked
 * 8. should be able to become solid red by some means
 * 9. Needs to have a way to know via user input (click) to flash OR via app input (sequence) to flash
 */

  constructor() { }

  ngOnInit(): void {
  }

}
