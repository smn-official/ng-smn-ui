import {
    AfterViewInit,
    ApplicationRef,
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    OnChanges, OnInit,
    Output, forwardRef
} from '@angular/core';
import {UiElement} from '../utils/providers/element.provider';
import {UiAutocompleteComponent} from './autocomplete.component';
import {UiWindowRef} from '../utils/providers/window.provider';
import {FormControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
    selector: '[uiAutocomplete]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UiAutocompleteDirective),
        multi: true
    }]
})
export class UiAutocompleteDirective implements AfterViewInit, OnInit, OnChanges {

    @Input() list: any[];
    @Input() ngModel: any;
    @Input() modelValue: any;
    @Input('model-property') modelProperty: any;
    @Input() select: Function;
    @Input() primary: string;
    @Input() secondary: string;
    @Input() loading: boolean;
    @Input('theme-class') themeClass: string;
    @Output() loadMore: EventEmitter<any> = new EventEmitter();
    @Output() loadMoreEmmiter: EventEmitter<any> = new EventEmitter();
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
    @Output() modelValueChange: EventEmitter<any> = new EventEmitter();
    @Output() selectChange: EventEmitter<any> = new EventEmitter();
    @Output() requiredChange: EventEmitter<any> = new EventEmitter();

    focusedIndex: number;
    accentClass: boolean;
    componentRef: any;
    componentElement: HTMLElement;
    wrapElement: HTMLElement;
    control: FormControl;
    onChange: Function;
    onTouched: Function;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private applicationRef: ApplicationRef,
                private injector: Injector,
                private elementRef: ElementRef) {
    }

    public ngOnInit() {
        this.selectChange.subscribe(item => {
            this.ngModel = item[this.primary] || item;
            this.modelValue = this.modelProperty && item && typeof item === 'object' ? item[this.modelProperty] : item;
            this.ngModelChange.emit(this.ngModel);
            this.modelValueChange.emit(this.modelValue);
            if (this.select) {
                this.select(item);
            }
            this.elementRef.nativeElement.blur();
            this.close();
        });

    }

    public ngAfterViewInit() {
        UiElement.on(UiWindowRef.nativeWindow, 'click resize', e => {
            if (this.componentRef) {
                if (!(UiElement.is(e.target, '.wrap-autocomplete') || UiElement.closest(e.target, '.wrap-autocomplete') || UiElement.is(e.target, '.overlay') || e.target === this.elementRef.nativeElement)) {
                    this.close();
                }
            }
        });
    }

    public ngOnChanges(changes) {
        if (changes.ngModel && !changes.ngModel.firstChange && this.componentRef) {
            this.componentRef.instance.ngModel = changes.ngModel.currentValue;
        }
        if (changes.list && !changes.list.firstChange && this.componentRef) {
            this.componentRef.instance.list = changes.list.currentValue;
            setTimeout(() => {
                const position = UiElement.position(this.elementRef.nativeElement);
                const coordinate = {
                    x: position.left,
                    y: position.top + 1
                };
                this.setPosition(coordinate, this.componentElement);
            });
        }
        if (changes.loading && !changes.loading.firstChange && this.componentRef) {
            this.componentRef.instance.loading = changes.loading.currentValue;
        }
    }

    private createComponent() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UiAutocompleteComponent);
        this.componentRef = componentFactory.create(this.injector);
    }

    private getComponentAsElement(): HTMLElement {
        return (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    private setInstances(component, componentRef): void {
        const keysComponent = ['ngModel', 'list', 'primary', 'secondary', 'selectChange', 'loading', 'accentClass', 'loadMore'];

        keysComponent.forEach(key => {
            componentRef.instance[key] = component[key];
        });
    }

    private render(element, coordinate): void {
        this.createWrapElement();
        this.wrapElement.appendChild(element);
        document.body.appendChild(this.wrapElement);


        setTimeout(() => {
            this.setPosition(coordinate, element);
            this.wrapElement.classList.add('open');
        });
    }

    private createWrapElement() {
        this.wrapElement = document.createElement('div');
        this.wrapElement.classList.add('wrap-autocomplete');
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        if (this.themeClass) {
            this.wrapElement.classList.add(this.themeClass);
        }

        UiElement.css(this.wrapElement, 'top', 0);
        UiElement.css(this.wrapElement, 'left', 0);
        UiElement.css(this.wrapElement, 'visibility', 'hidden');
        UiElement.css(this.wrapElement, 'transition', 'none');
        this.wrapElement.appendChild(overlay);
    }

    private setFocusIndex(index) {
        this.componentRef.instance.focusedIndex = index;
    }

    private close() {
        if (this.wrapElement) {
            this.wrapElement.classList.remove('open');
            setTimeout(() => {
                if (this.componentRef) {
                    this.applicationRef.detachView(this.componentRef.hostView);
                    this.componentRef = null;
                    this.wrapElement.remove();
                }
            }, 280);
        }
    }

    private initialize() {
        this.focusedIndex = undefined;

        this.accentClass = this.elementRef.nativeElement.classList.contains('accent');

        const position = UiElement.position(this.elementRef.nativeElement);
        const coordinate = {
            x: position.left,
            y: position.top + 1
        };

        if (!this.componentRef) {
            this.createComponent();
            this.setInstances(this, this.componentRef);
            this.applicationRef.attachView(this.componentRef.hostView);
            this.componentElement = this.getComponentAsElement();
            this.render(this.componentElement, coordinate);
        }
    }

    private setPosition(coordinate, element) {
        const wrap = element.querySelector('.suggestions-wrap');
        const maxHeightWrap = !!this.secondary ? 370 : 240;
        const horizontalCoveringArea = coordinate.x + wrap.clientWidth;
        const verticalCoveringArea = coordinate.y + (wrap.clientHeight > maxHeightWrap ? maxHeightWrap : wrap.clientHeight);
        const windowWidth = window.innerWidth + (document.body.scrollLeft || window.scrollX);
        const windowHeight = window.innerHeight + (document.body.scrollTop || window.scrollY);

        if (horizontalCoveringArea > windowWidth) {
            coordinate.x = windowWidth - (wrap.clientWidth + 8);
        }

        if (coordinate.x <= 8) {
            coordinate.x = 8;
        }

        if (verticalCoveringArea > windowHeight) {
            coordinate.y = coordinate.y - ((wrap.clientHeight > maxHeightWrap ? maxHeightWrap : wrap.clientHeight) + this.elementRef.nativeElement.clientHeight) - 14; // 14 = label focus
        }

        UiElement.css(this.wrapElement, 'top', `${coordinate.y + this.elementRef.nativeElement.clientHeight}px`);
        UiElement.css(this.wrapElement, 'left', `${coordinate.x}px`);
        UiElement.css(this.wrapElement, 'width', `${this.elementRef.nativeElement.clientWidth}px`);
        UiElement.css(this.wrapElement, 'visibility', '');
        UiElement.css(this.wrapElement, 'transition', '');
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    validate(control: FormControl): { [key: string]: any } {

        this.control = control;

        if (this.elementRef.nativeElement.hasAttribute('required') && !control.value) {
            return {required: true};
        }

        return null;
    }

    @HostListener('input') onInput() {
        if (!(this.ngModel && this.modelValue) || (this.ngModel !== this.modelValue)) {
            this.modelValue = null;
            this.modelValueChange.emit(this.modelValue);
            this.control.updateValueAndValidity();
        }
    }

    @HostListener('focus') onFocus() {
        this.initialize();
    }

    @HostListener('click') onClick() {
        this.initialize();
    }

    @HostListener('blur', ['$event']) onBlur(e) {
        if (e.relatedTarget !== this.componentElement.querySelector('ui-card.suggestions')) {
            this.close();
        }
    }

    @HostListener('keydown', ['$event']) onKeydown(e) {
        if (!this.componentRef) {
            return;
        }
        if (typeof this.focusedIndex === 'undefined') {
            this.focusedIndex = -1;
        }
        switch (e.which) {
            case 8:
            case 37:
                this.elementRef.nativeElement.focus();
                break;
            case 38:
                this.focusedIndex = !this.list.length ? null : this.focusedIndex ? this.focusedIndex - 1 : this.list.length - 1;
                this.setFocusIndex(this.focusedIndex);
                break;
            case 40:
                this.focusedIndex = !this.list.length ? null : this.list.length - 1 === this.focusedIndex ? 0 : this.focusedIndex + 1;
                this.setFocusIndex(this.focusedIndex);
                break;
            case 13:
                if (this.list && typeof this.focusedIndex === 'number' && this.focusedIndex !== -1) {
                    this.selectChange.emit(this.list[this.focusedIndex]);
                }
                event.preventDefault();
                break;
        }
    }

}
