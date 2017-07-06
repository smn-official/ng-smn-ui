import {Injectable} from '@angular/core';

@Injectable()
export class UiElement {
    static caretPosition = {
        // https://javascriptexamples.info/snippet/getset-cursor-in-html-textarea
        get: _getCaretPosition,
        set: _setCaretPosition
    };

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

    static off(el, events, listener): any {
        return _off(el, events, listener);
    }

    static is(el, selector): any {
        return _is(el, selector);
    }

    static position(el, withoutScroll?): any {
        return _position(el, withoutScroll);
    }

    static animate(object, property, start_value, end_value, time, end?, tick?): any {
        return _animate(object, property, start_value, end_value, time, end, tick);
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
function _off(el, events, listener): any {
    events = events.split(' ');
    const iLen = events.length;
    for (let i = 0; i < iLen; i++) {
        if (events[i]) {
            el.removeEventListener(events[i], listener, false);
        }
    }
}
function _is(el, selector): any {
    const matches = el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector;

    if (matches) {
        return (matches).call(el, selector);
    } else {
        return null;
    }
}
function _position(el, withoutScroll): any {
    /* http://javascript.info/tutorial/coordinates */

    if (el.getBoundingClientRect) {
        return getOffsetRect(el);
    } else { // old browser
        return getOffsetSum(el);
    }

    function getOffsetSum(elem) {
        /* Source: http://javascript.info/tutorial/coordinates */

        let top = 0, left = 0;

        while (elem) {
            top = top + parseInt(elem.offsetTop, 10);
            left = left + parseInt(elem.offsetLeft, 10);
            elem = elem.offsetParent;
        }

        return {top: top, left: left};
    }

    function getOffsetRect(elem) {
        /* http://javascript.info/tutorial/coordinates */

        const box = elem.getBoundingClientRect();

        const body = document.body;
        const docElem = document.documentElement;

        let scrollTop = 0;
        let scrollLeft = 0;
        if (!withoutScroll) {
            scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
            scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        }

        const clientTop = docElem.clientTop || body.clientTop || 0;
        const clientLeft = docElem.clientLeft || body.clientLeft || 0;

        const top = box.top + scrollTop - clientTop;
        const left = box.left + scrollLeft - clientLeft;

        return {top: Math.round(top), left: Math.round(left)};
    }
}
function _getCaretPosition(el): any {
    const documentt:any = {
        selection: undefined
    };
    Object.assign(documentt, document);

    let caretPos = 0;
    if (documentt.selection) { // IE Support
        el.focus();
        const select = documentt.selection.createRange();
        select.moveStart('character', -el.value.length);
        caretPos = select.text.length;
    } else if (el.selectionStart || el.selectionStart === '0') { // Firefox support
        caretPos = el.selectionStart;
    }

    return caretPos;
}
function _setCaretPosition(el, beforeSelIndex, afterSelIndex, symbolsPositions?): any {
    let futureSelIndex;
    symbolsPositions = symbolsPositions ? symbolsPositions : [];

    if (el.selectionStart || el.selectionStart === '0') {

        futureSelIndex = afterSelIndex;

        for (let i = 0; i < symbolsPositions.length; i++) {
            if (beforeSelIndex === symbolsPositions[i] && afterSelIndex === symbolsPositions[i] + 1) {
                futureSelIndex = symbolsPositions[i] + 2;

                break;
            }
        }

        setCaret();
        setTimeout(() => {
            setCaret();
        });
    }

    function setCaret() {
        if (el.createTextRange) {
            const range = el.createTextRange();
            range.move('character', futureSelIndex);
            range.select();
        } else {
            if (el.selectionStart) {
                el.focus();
                el.setSelectionRange(futureSelIndex, futureSelIndex);
            } else {
                el.focus();
            }
        }
    }
}
function _animate(object, property, start_value, end_value, time, end, tick) {
    const propWithPx = ['width', 'height', 'left', 'top', 'border-radius', 'border-spacing', 'margin-left', 'margin-top'];

    const frame_rate = 0.06; // 60 FPS
    let frame = 0;
    const delta = (end_value - start_value) / time / frame_rate;
    const handle = setInterval(() => {
        frame++;
        const value = start_value + delta * frame;

        if (tick) {
            tick(value);
        }

        const hasPx = propWithPx.indexOf(property) > -1;

        object.style[property] = value + (hasPx ? 'px' : '');
        if ((start_value > end_value ? value.toFixed(2) <= end_value : value.toFixed(2) >= end_value)) {
            clearInterval(handle);

            if (end) {
                end();
            }
        }
    }, 1 / frame_rate);
}
