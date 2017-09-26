import {Injectable} from '@angular/core';

@Injectable()
export class UiElement {
    static caretPosition = {
        get: function getCaretPosition(el): any {
            // https://javascriptexamples.info/snippet/getset-cursor-in-html-textarea

            const documentt: any = {
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
        },
        set: function setCaretPosition(el, beforeSelIndex, afterSelIndex, symbolsPositions?): any {
            // https://javascriptexamples.info/snippet/getset-cursor-in-html-textarea

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

                    setTimeout(() => {
                        setCaret();
                    });
                }

                function setCaret() {
                    if (el.setSelectionRange) {
                        if (el.selectionStart) {
                            el.focus();
                            el.setSelectionRange(futureSelIndex, futureSelIndex);
                        } else {
                            el.focus();
                        }
                    } else if (el.createTextRange) {
                        const range = el.createTextRange();
                        range.collapse(true);
                        range.move('character', futureSelIndex);
                        range.moveEnd('character', futureSelIndex);
                        range.moveStart('character', futureSelIndex);
                        range.select();
                    }
                }
        }
    };

    static classList = {
        remove: function removeClass(el, className) {
            return el.classList.remove(className);
        },
        add: function addClass(el, className) {
            return el.classList.add(className);
        },
        contains: function addClass(el, className) {
            return el.classList.contains(className);
        }
    };

    static disableScroll(): any {
        if (window.addEventListener) { // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        }
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    static enableScroll(): any {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        }
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    static closest(el, selector): any {
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

    static index(el): any {
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

    static trigger(el, eventToTrigger): any {
        const event = document.createEvent('HTMLEvents');
        event.initEvent(eventToTrigger, true, false);
        el.dispatchEvent(event);
    }

    static on(el, events, listener): any {
        let elements;
        if (el.constructor === NodeList) {
            elements = el;
        } else {
            elements = [el];
        }

        events = events.split(' ');

        Array.prototype.forEach.call(elements, el2 => {
            events.forEach(event => el2.addEventListener(event, listener, false));
        });
    }

    static off(el, events, listener): any {
        events = events.split(' ');
        const iLen = events.length;
        for (let i = 0; i < iLen; i++) {
            if (events[i]) {
                el.removeEventListener(events[i], listener, false);
            }
        }
    }

    static is(el, selector): any {
        const matches = el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector;

        if (matches) {
            return (matches).call(el, selector);
        } else {
            return null;
        }
    }

    static position(el, withoutScroll?): any {
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

    static offset(el): any {
        const top = el.offsetTop;
        const left = el.offsetLeft;

        return {top: Math.round(top), left: Math.round(left)};
    }

    static animate(object, property, start_value, end_value, time, end?, tick?): any {
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

    static css(el, styleProp, newValue?) {
        if (typeof newValue !== 'undefined') {
            styleProp = styleProp.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });

            el.style[styleProp] = newValue;
        } else {
            let value;
            const defaultView = (el.ownerDocument || document).defaultView;
            // W3C standard way:
            if (defaultView && defaultView.getComputedStyle) {
                // sanitize property name to css notation
                // (hyphen separated words eg. font-Size)
                styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
                return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
            } else if (el.currentStyle) { // IE
                // sanitize property name to camelCase
                styleProp = styleProp.replace(/-(\w)/g, function (str, letter) {
                    return letter.toUpperCase();
                });
                value = el.currentStyle[styleProp];
                // convert other units to pixels on IE
                if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                    return (function (value2) {
                        const oldLeft = el.style.left;
                        const oldRsLeft = el.runtimeStyle.left;
                        el.runtimeStyle.left = el.currentStyle.left;
                        el.style.left = value2 || 0;
                        value2 = el.style.pixelLeft + 'px';
                        el.style.left = oldLeft;
                        el.runtimeStyle.left = oldRsLeft;
                        return value2;
                    })(value);
                }
                return value;
            }
        }
    }

    static isInViewport(el) {
        const rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    static focus(el) {
        el.focus();
        const headerSpace = document.querySelector('ui-toolbar header').clientHeight + 16;
        const elTop = UiElement.position(el, true).top;

        if (elTop < headerSpace) {
            window.scrollTo(0, UiElement.position(el).top - headerSpace);
        }

        return;
    }
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

