import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {imageAnimation, animationLetter} from './avatar.animations';
import {UiColor} from '../utils/providers/color.provider';
import {UiElement} from '../utils/providers/element.provider';

@Component({
    selector: 'ui-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
    animations: [imageAnimation, animationLetter]
})
export class UiAvatarComponent implements OnInit, AfterViewInit, OnChanges {
    newImage: string;
    showImage: boolean;
    grayscale: boolean;

    @Input() name: string;
    @Input() color: string;
    @Input() image: string;
    @Input() size: number;

    constructor(private element: ElementRef) {
    }

    ngOnInit(): void {
        this.newImage = this.image;
    }

    ngAfterViewInit(): void {
        this.setSize();
    }

    ngOnChanges(changes): void {
        if (changes.name && !changes.name.firstChange) {
            this.name = changes.name.currentValue;
        }
        if (changes.color && !changes.color.firstChange) {
            this.color = changes.color.currentValue;
        }
        if (changes.image && !changes.image.firstChange) {
            if (!changes.image.currentValue) {
                this.showImage = false;
                this.newImage = null;
            }
            this.image = changes.image.currentValue;
        }
        if (changes.size && !changes.size.firstChange) {
            this.size = changes.size.currentValue;
            this.setSize();
        }
    }

    isBright(color): boolean {
        return UiColor.isBright(color);
    }

    loadedImage(): void {
        this.showImage = true;
        this.animateImage();
    }

    animateImage(): void {
        this.grayscale = true;
        setTimeout(() => {
            this.grayscale = false;
            this.newImage = this.image;
        }, 1120);
    }

    setSize() {
        if (this.size) {
            const wrap = this.element.nativeElement.querySelector('.wrap');
            UiElement.css(this.element.nativeElement.querySelector('.empty'), 'font-size', `${Math.round(this.size / 100 * 36.36)}px`);
            UiElement.css(wrap, 'width', `${this.size}px`);
            UiElement.css(wrap, 'height', `${this.size}px`);
        }
    }
}
