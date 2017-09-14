import {animate, style, transition, trigger} from '@angular/animations';

export const explosionAnimation = trigger(
    'explosion', [
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'scale(1.3)'
            }),
            animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                opacity: 1,
                transform: 'scale(1)'
            }))
        ]),
        transition(':leave', [
            style({
                opacity: 1,
                transform: 'scale(1)'
            }),
            animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                opacity: 0,
                transform: 'scale(1.3)'
            }))
        ])
    ],
);

export const fadeAnimation = trigger(
    'fade', [
        transition(':enter', [
            style({
                opacity: 0,
            }),
            animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                opacity: 1,
            }))
        ]),
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
