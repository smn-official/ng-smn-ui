import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class ToolbarService {
    sharedValue: String;
    titleChange: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    public getTitle() {
        return this.sharedValue;
    }

    public setTitle(sharedValue: String) {
        this.sharedValue = sharedValue;

        this.titleChange.emit(sharedValue);
    }
}
