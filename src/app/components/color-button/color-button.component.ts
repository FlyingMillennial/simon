import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ButtonColor } from 'src/app/shared/button-colors.enum';
import { getSound } from 'src/app/shared/button-sounds';
import { Subject, Subscription } from 'rxjs';
import { SoundService } from 'src/app/shared/sound-service.service';

@Component({
  selector: 'app-color-button',
  templateUrl: './color-button.component.html',
  styleUrls: ['./color-button.component.scss']
})
export class ColorButtonComponent implements OnInit, OnDestroy {

  @Input() color:ButtonColor;
  @Input() failed:boolean = false;
  @Input() chirpSubject: Subject<ButtonColor>;
  @Input() enableButton:boolean;
  @Output() clicked:EventEmitter<ButtonColor> = new EventEmitter();

  private chirpSubscription: Subscription;
  public cssClassObject:any;

  constructor(private soundService: SoundService) { }

  private getCssClassObject(color) {
    let cssClassObject = {};
    cssClassObject[color] = true;
    cssClassObject["lit"] = false;
    return cssClassObject;
  }

  ngOnInit():void {
    this.cssClassObject = this.getCssClassObject(this.color);
    this.chirpSubscription = this.chirpSubject.subscribe((color:ButtonColor) => {
      if (color === this.color) {
        this.chirp();
      }
    });
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
    if (!this.soundService.appMuted) {
      sound.play();
    }
  }

  public chirp() {
    this.cssClassObject["lit"] = true;
    this.playSound(this.color);
    setTimeout(() => {
      this.cssClassObject["lit"] = false;
    }, 600);
  }

  ngOnDestroy():void {
    this.chirpSubscription.unsubscribe();
  }

}
