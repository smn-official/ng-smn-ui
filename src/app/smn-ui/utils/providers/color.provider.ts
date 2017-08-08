import {Injectable} from '@angular/core';

@Injectable()
export class UiColor {
    static isBright(hex, minDarkPerc?): boolean {
        return _isBright(hex, minDarkPerc);
    }

    static hexToRgb(hex): {} {
        return _hexToRgb(hex);
    }

    constructor() {
    }
}

function _isBright(hex, minDarkPerc) {
    const color = _hexToRgb(hex);
    if (!color) {
        return false;
    }
    const luminosityPerc = 1 - (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255;
    return (luminosityPerc < (minDarkPerc || 0.3));
}

function _hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
