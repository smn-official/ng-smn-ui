import {animate, state, style, transition, trigger} from '@angular/animations';

export const tabFakeAnimation = trigger('tabFakeAnimation',
    [
        transition(':enter', animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
        transition(':leave', animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
    ]
);

export const tabTransform = trigger('tabTransform',
    [
        state('left', style({
            transform: 'translateX(-100%)',
            position: 'absolute'
        })),
        state('right', style({
            transform: 'translateX(100%)',
            position: 'absolute'
        })),
        state('active', style({
            transform: 'translateX(0)',
            position: 'relative'
        })),
        transition('left <=> right', animate(280)),
        transition('active <=> right', animate(280)),
        transition('left <=> active', animate(280)),
    ]
);
