import {Injectable} from '@angular/core';

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

@Injectable()
export class UiElement {
    closest(el, selector): any {
        return _closest(el, selector);
    }

    index(el): any {
        return _index(el);
    }
}
