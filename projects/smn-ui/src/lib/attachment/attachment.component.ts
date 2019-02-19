import { Component } from '@angular/core';

@Component({
    selector: 'ui-attachment',
    templateUrl: './attachment.component.html',
    styleUrls: ['./attachment.component.scss']
})
export class UiAttachmentComponent {
    constructor() { }

    readFile({ file, item, index }) {
        console.log({ file, item, index });
    }
}
