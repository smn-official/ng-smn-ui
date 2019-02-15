import {
    AfterContentInit,
    AfterViewInit, ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter, HostListener,
    Input, OnChanges,
    OnInit,
    Output,
    QueryList, TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {UiChosenOptionComponent} from './chosen-option/chosen-option.component';
import {UiElement} from '../utils/providers/element.provider';

@Component({
    selector: 'ui-chosen',
    templateUrl: './chosen.component.html',
    styleUrls: ['./chosen.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: UiChosenComponent,
        multi: true,
    }]
})
export class UiChosenComponent implements OnInit, AfterViewInit, OnChanges, AfterContentInit {

    viewRef: any;
    value: any;
    focused: boolean;

    @Input() ngModel: any;
    @Input() required: boolean;
    @Input() placeholder: string;
    @Input() persistPlaceholder: string;

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('optionTemplate') optionTemplate: TemplateRef<any>;

    /**
     * O param "descendants" fala para o @ContentChildren pegar todos components UiChosenOptionComponent
     * mesmo que eles estejam dentro de outros components(UiChosenGroupComponent)
     */
    @ContentChildren(UiChosenOptionComponent, {descendants: true}) options: QueryList<UiChosenOptionComponent>;

    constructor(private element: ElementRef,
                private viewContainerRef: ViewContainerRef,
                private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.element.nativeElement.setAttribute('tabindex', '0');

        UiElement.on(window, 'resize scroll', (e) => {
            this.close();
        });
    }

    ngOnChanges(changes) {
        if (changes.ngModel && !changes.ngModel.firstChange) {
            this.setValue(changes.ngModel.currentValue);
        }
    }

    ngAfterContentInit() {
        if (this.ngModel) {
            setTimeout(() => this.setValue(this.ngModel));
        }
    }

    writeValue() {
    }

    registerOnChange() {
    }

    registerOnTouched() {
    }

    @HostListener('focus')
    onFocus() {
        if (this.focused) {
            return;
        }

        this.focused = true;

        const position = UiElement.position(this.element.nativeElement);
        const coordinate = {
            x: position.left,
            y: position.top + this.element.nativeElement.clientHeight
        };

        this.render(coordinate);
    }

    render(coordinate) {
        this.viewRef = this.viewContainerRef.createEmbeddedView(this.optionTemplate);
        this.viewRef.detectChanges();

        this.viewRef.rootNodes.forEach(rootNode => {
            document.body.appendChild(rootNode);

            if (rootNode.clientWidth && !rootNode.classList.contains('wrap-chosen-overlay')) {
                this.open(rootNode, coordinate);
            }
        });
    }

    open(element, coordinate) {
        setTimeout(() => {
            const horizontalCoveringArea = coordinate.x + element.clientWidth;
            const verticalCoveringArea = coordinate.y + element.clientHeight;
            const windowWidth = window.innerWidth + document.body.scrollLeft;
            const windowHeight = document.body.clientHeight + (document.body.scrollTop || window.scrollY || window.pageYOffset);

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

            element.style.transform = '';
            element.querySelector('ui-card').style.maxHeight = window.innerHeight + 'px';
            element.querySelector('ui-card').style.maxWidth = (window.innerWidth - 16) + 'px';
            element.querySelector('ui-card').style.width = this.element.nativeElement.clientWidth + 'px';
            element.style.top = coordinate.y + 'px';
            element.style.left = coordinate.x + 'px';

            element.classList.add('open');
        });
    }

    close() {
        this.focused = false;

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

    setValue(value) {
        this.options.map(option => {
            if (option.value !== value) {
                option.setActive(false);
                return;
            }

            this.value = option.label;
            option.setActive(true);
        });
    }

    select(option) {
        this.ngModelChange.emit(option.value);
        this.close();
    }
}
