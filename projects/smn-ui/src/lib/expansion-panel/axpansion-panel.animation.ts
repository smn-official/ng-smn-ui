import {animate, style, transition, trigger} from '@angular/animations';

export const expandAnimation = trigger('expandAnimation',
    [
        transition(
            ':enter', [
                style({
                    height: '0',
                }),
                animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                    height: '*',
                }))
            ]
        ),
        transition(
            ':leave', [
                style({
                    height: '*',
                }),
                animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                    height: '0',
                }))
            ]
        )]
);