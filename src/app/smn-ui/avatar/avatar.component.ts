import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {imageAnimation, animationLetter} from './avatar.animations';

@Component({
    selector: 'ui-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    animations: [imageAnimation, animationLetter]
})
export class UiAvatarComponent implements OnInit, OnChanges {
    newImage: string;
    showImage: boolean;
    grayscale: boolean;

    @Input() name: string;
    @Input() color: string;
    @Input() image: string;

    constructor() {
    }

    ngOnInit(): void {
        this.newImage = this.image;
    }

    ngOnChanges(changes) {
        if (changes.name && !changes.name.firstChange) {
            this.name = changes.name.currentValue;
        }
        if (changes.color && !changes.color.firstChange) {
            this.color = changes.color.currentValue;
        }
        if (changes.image && !changes.image.firstChange) {
            this.image = changes.image.currentValue;
        }
    }

    loadedImage() {
        this.showImage = true;
        this.animateImage();
    }

    animateImage() {
        this.grayscale = true;
        setTimeout(() => {
            this.grayscale = false;
            this.newImage = this.image;
        }, 1120);
    }
}
