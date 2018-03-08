import {UiElement} from './element.provider';

export class UiElementRef {
    nativeElement: any;
    length: number;
    classList: any;

    constructor(element: any) {
        this.nativeElement = element;

        if (element) {
            if (element.length) {
                this.length = element.length;
                if (element === window) {
                    this[0] = new UiElementRef(element);
                } else {
                    element.forEach((item, i) => {
                        this[i] = new UiElementRef(item);
                    });
                }
            } else {
                this.length = 1;
                this[0] = element;
            }
        }

        this.classList = {
            remove: function removeClass(className) {
                return UiElement.classList.remove(element, className);
            },
            add: function addClass(className) {
                return UiElement.classList.add(element, className);
            },
            contains: function addClass(className) {
                return UiElement.classList.contains(element, className);
            }
        };
    }

    closest(selector): any {
        return new UiElementRef(UiElement.closest(this.nativeElement, selector));
    }

    index(): any {
        return UiElement.index(this.nativeElement);
    }

    trigger(eventToTrigger): any {
        return UiElement.trigger(this.nativeElement, eventToTrigger);
    }

    on(events, listener): any {
        return UiElement.on(this.nativeElement, events, listener);
    }

    off(events, listener): any {
        return UiElement.off(this.nativeElement, events, listener);
    }

    is(selector): any {
        return UiElement.is(this.nativeElement, selector);
    }

    position(withoutScroll?): any {
        return UiElement.position(this.nativeElement, withoutScroll);
    }

    offset(): any {
        return UiElement.offset(this.nativeElement);
    }

    animate(property, start_value, end_value, time, end?, tick?): any {
        return UiElement.animate(this.nativeElement, property, start_value, end_value, time, end, tick);
    }

    querySelector(selector): any {
        let selected = this.nativeElement.querySelectorAll(selector);

        if (selected.length) {
            selected = selected.length === 1 ? selected[0] : selected;
            return new UiElementRef(selected);
        }

        return new UiElementRef(null);
    }

    forEach(callback): any {
        return Array.prototype.forEach.call(this, callback);
    }

    filter(callback): any {
        return Array.prototype.filter.call(this, callback);
    }

    indexOf(element): any {
        return Array.prototype.indexOf.call(this, element);
    }

    css(styleProp, newValue?): any {
        return UiElement.css(this.nativeElement, styleProp, newValue);
    }

    isInViewport(): any {
        return UiElement.isInViewport(this.nativeElement);
    }

    attribute(name, value?): any {
        if (typeof value !== 'undefined') {
            return this.nativeElement.setAttribute(name, value);
        } else {
            return this.nativeElement.getAttribute(name);
        }
    }

    height(newHeight?) {
        if (typeof newHeight !== 'undefined') {
            UiElement.css(this.nativeElement, 'height', newHeight);
        }

        return this.nativeElement.clientHeight;
    }

    parent() {
        return new UiElementRef(this.nativeElement.parentNode);
    }

    focus() {
        if (this.nativeElement && this.nativeElement.focus) {
            this.nativeElement.focus();
        }
    }
}
