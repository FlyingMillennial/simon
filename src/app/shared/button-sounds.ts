import * as sounds from "../../assets/sounds";
import { ButtonColor } from "./button-colors.enum";

export const getSound = (color:ButtonColor):HTMLAudioElement => {
    switch(color) {
        case ButtonColor.red:
            return new Audio(sounds.soundOne);
        case ButtonColor.blue:
            return new Audio(sounds.soundTwo);
        case ButtonColor.yellow:
            return new Audio(sounds.soundThree);
        case ButtonColor.green:
            return new Audio(sounds.soundFour);
    }
}