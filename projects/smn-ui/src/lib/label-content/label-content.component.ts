import {Component, Input} from '@angular/core';

@Component({
    selector: 'ui-label-content',
    templateUrl: './label-content.component.html',
    styleUrls: ['./label-content.component.scss']
})
export class UiLabelContentComponent {
    @Input() label: string;
    @Input() content: string;
}
