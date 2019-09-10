import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';

const timing = 280;
export const tabFakeAnimation: AnimationTriggerMetadata = trigger('tabFakeAnimation',
    [
        transition(':enter', animate(`${timing}ms cubic-bezier(0.0, 0.0, 0.2, 1)`)),
        transition(':leave', animate(`${timing}ms cubic-bezier(0.0, 0.0, 0.2, 1)`)),
    ]
);

export const tabTransform: AnimationTriggerMetadata = trigger('tabTransform',
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
        transition('left <=> right', animate(timing)),
        transition('active <=> right', animate(timing)),
        transition('left <=> active', animate(timing)),
    ]
);
