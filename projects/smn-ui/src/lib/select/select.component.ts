import {
    Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output,
    ViewContainerRef, ViewChild, TemplateRef, AfterViewInit, OnChanges
} from '@angular/core';
import {UiElement} from '../utils/providers/element.provider';
import {NG_VALUE_ACCESSOR, NgModel} from '@angular/forms';
import {UiSelectFilterPipe} from './select-filter.pipe';

@Component({
    selector: 'ui-select',
    templateUrl: 'select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: UiSelectComponent,
        multi: true,
    }],
})

export class UiSelectComponent implements OnInit, AfterViewInit, OnChanges {
    @Input('dark-class') darkClass;
    @Input() input;
    @Input() chosen;
    @Output() ngModelChange = new EventEmitter();
    selected;
    viewRef;
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
    @ViewChild('selectNative') selectNative;
    selectedNative;
    search;
    @Input() value;
    @Input() label;
    @Input() options;
    @Input() ngModel;
    optionsExternal;
    @ViewChild(NgModel) model: NgModel;
    isMobile = UiElement.isMobile;

    constructor(public element: ElementRef, public viewContainerRef: ViewContainerRef) {
        this.options = [];
        this.optionsExternal = [];
    }

    ngOnInit() {
        this.element.nativeElement.setAttribute('tabindex', 0);
        this.selectOption();
    }

    ngAfterViewInit() {
    }

    ngOnChanges(changes) {
        if (changes.options || changes.ngModel) {
            this.selectOption();
        }
        if (changes.ngModel && !changes.ngModel.firstChange) {
            this.ngModel = changes.ngModel.currentValue;

            if (changes.ngModel.currentValue) {
                this.selectOption();
            } else {
                this.onChangeSelect(changes.ngModel.currentValue);
            }
        }
    }

    @HostListener('focus')
    onFocus() {
        this.close();

        const closestFieldset = UiElement.closest(this.element.nativeElement, 'fieldset:disabled');

        if (!this.element.nativeElement.disabled && !closestFieldset) {
            if (this.isMobile()) {
                this.selectNative.nativeElement.focus();
            } else {
                setTimeout(() => {
                    const position = UiElement.position(this.element.nativeElement);
                    const coordinate = {
                        x: position.left,
                        y: position.top
                    };
                    this.render(coordinate);
                });
            }
        }
    }

    @HostListener('blur', ['$event'])
    onBlur(event) {
        if (!event.relatedTarget || !(UiElement.is(event.relatedTarget, 'ui-select-option') || UiElement.closest(event.relatedTarget, '.wrap-select'))) {
            this.close();
        }
    }


    render(coordinate) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.viewRef.detectChanges();

        this.viewRef.rootNodes.forEach(rootNode => {
            document.body.appendChild(rootNode);

            if (rootNode.clientWidth) {
                this.open(rootNode, coordinate);
            }
        });
    }

    open(element, coordinate) {
        setTimeout(() => {
            const horizontalCoveringArea = coordinate.x + element.clientWidth;
            const verticalCoveringArea = coordinate.y + element.clientHeight;
            const windowWidth = window.innerWidth + window.scrollX;
            const windowHeight = document.body.clientHeight + window.scrollY;

            if (horizontalCoveringArea > windowWidth) {
                coordinate.x = windowWidth - (element.clientWidth + 8);
            }

            if (coordinate.x <= 8) {
                coordinate.x = 8;
            }

            if (verticalCoveringArea > windowHeight) {
                coordinate.y = windowHeight - (element.clientHeight + 8);
            }

            if (coordinate.y <= 0) {
                coordinate.y = 0;
            }

            if (this.darkClass) {
                element.classList.add(this.darkClass);
            }

            element.style.transform = '';
            // element.querySelector('ui-card').style.maxHeight = window.innerHeight + 'px';
            element.style.top = coordinate.y + 'px';
            element.style.left = coordinate.x + 'px';
            element.style.left = coordinate.x + 'px';
            element.style.width = this.element.nativeElement.clientWidth + 'px';

            element.querySelector('.selected').addEventListener('blur', (event) => {
                if (!event.relatedTarget || !(UiElement.is(event.relatedTarget, 'ui-select-option') || UiElement.is(event.relatedTarget, '.input-select'))) {
                    this.close();
                }
            });
            if (this.chosen) {
                element.querySelector('.input-select').addEventListener('blur', (event) => {
                    if (!event.relatedTarget || !(UiElement.is(event.relatedTarget, 'ui-select-option') || UiElement.is(event.relatedTarget, '.selected'))) {
                        this.close();
                    }
                });
                element.querySelector('.input-select').click();
                element.scrollTo(0, 0);
            } else {
                element.querySelector('.selected').focus();
            }

            element.classList.add('open');
        });
    }

    close() {
        if (this.viewContainerRef.length) {
            const viewRef = this.viewRef; // Salvando a referência para achar o index deste componente

            viewRef.rootNodes.forEach(rootNode => {
                if (rootNode.classList) {
                    rootNode.classList.remove('open');
                }
            });

            setTimeout(() => this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef)), 280);
        }
    }

    onChangeSelect(select) {
        if (select) {
            this.model = select[this.value];
            this.selected = select[this.label];
            this.ngModelChange.emit(select[this.value]);
        } else {
            this.search = select;
            this.model = select;
            this.selected = select;
            this.ngModelChange.emit(select);
        }
    }

    selectOption() {
        this.options.forEach(option => {
            if (option[this.value] === this.ngModel) {
                this.onChangeSelect(option);
            }
        });
    }

    writeValue() {
    }

    registerOnChange() {
    }

    registerOnTouched() {
    }
}

