import {animate, style, transition, trigger} from '@angular/animations';

export const imageAnimation = trigger(
    'image', [
        transition(':enter', [
            style({
                opacity: 0,
            }),
            animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                opacity: 1
            }))
        ]),
        transition(':leave', [
            style({
                opacity: 1,
            }),
            animate('2800ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                opacity: 0,
            }))
        ])
    ],
);

export const animationLetter = trigger(
    'letter', [
        transition(':leave', [
            style({
                opacity: 1,
            }),
            animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                opacity: 0,
            }))
        ])
    ],
);
