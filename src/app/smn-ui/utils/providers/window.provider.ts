import {Injectable} from '@angular/core';

export function _window(): any {
    // return the global native browser window object
    return window;
}

@Injectable()
export class UiWindowRef {
    static nativeWindow(): any {
        return _window();
    }
}
