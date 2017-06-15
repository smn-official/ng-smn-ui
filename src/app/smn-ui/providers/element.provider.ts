import {Injectable} from '@angular/core';

@Injectable()
export class UiElement {
    static closest(el, selector): any {
        return _closest(el, selector);
    }

    static index(el): any {
        return _index(el);
    }

    static trigger(el, eventToTrigger): any {
        return _trigger(el, eventToTrigger);
    }

    static on(el, events, listener): any {
        return _on(el, events, listener);
    }

    static is(el, selector): any {
        return _is(el, selector);
    }
}

function _closest(el, selector): any {
    /* Source: http://stackoverflow.com/questions/18663941/finding-closest-element-without-jquery */

    let matchesFn = null;

    // find vendor prefix
    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] === 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    });

    let parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
}
function _index(el): any {
    const nodes = el.parentNode.childNodes;
    let node;
    let count;
    let i = count = 0;
    while ((node = nodes.item(i++)) && node !== el) {
        if (node.nodeType === 1) {
            count++;
        }
    }

    return count;
}
function _trigger(el, eventToTrigger): any {
    const event = document.createEvent('HTMLEvents');
    event.initEvent(eventToTrigger, true, false);
    el.dispatchEvent(event);
}
function _on(el, events, listener): any {
    events = events.split(' ');
    const iLen = events.length;
    for (let i = 0; i < iLen; i++) {
        if (events[i]) {
            el.addEventListener(events[i], listener, false);
        }
    }
}
function _is(el, selector): any {
    el = el || {
            msMatchesSelector: undefined,
            mozMatchesSelector: undefined,
            webkitMatchesSelector: undefined,
            oMatchesSelector: undefined
        };

    return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}
