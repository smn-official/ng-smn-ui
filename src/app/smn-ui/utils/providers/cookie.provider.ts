import {Injectable} from '@angular/core';

@Injectable()
export class UiCookie {
    static get(name: string) {
        const ca: Array<string> = document.cookie.split(';');
        const caLen: number = ca.length;
        const cookieName = `${name}=`;
        let c: string;

        for (let i = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) === 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    static has(name: string) {
        return !!this.get(name);
    }

    static delete(name) {
        this.set(name, '', -1);
    }

    static set(name: string, value: string, expireDays: number = 365, path: string = '/') {
        const d: Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        const expires: string = 'expires=' + d.toUTCString();
        document.cookie = name + '=' + value + '; ' + expires + '; path=' + path;
    }
}
