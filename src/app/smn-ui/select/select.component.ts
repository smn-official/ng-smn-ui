import {
    Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output,
    ViewEncapsulation, ViewContainerRef, ViewChild, TemplateRef
} from '@angular/core';
import {UiElement} from '../utils/providers/element.provider';
import {UiElementRef} from '../utils/providers/element-ref.provider';

@Component({
    selector: 'ui-select',
    templateUrl: 'select.component.html',
    styleUrls: ['./select.component.scss']
})

export class UiSelectComponent implements OnInit {
    @Input() model;
    @Output() modelChange = new EventEmitter();
    selected;
    options;
    viewRef;
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor(public element: ElementRef, public viewContainerRef: ViewContainerRef) {
        this.options = [];
    }

    ngOnInit() {
        this.element.nativeElement.setAttribute('tabindex', 1);
    }

    @HostListener('focus')
    onFocus() {
        this.close();

        setTimeout(() => {
            const position = UiElement.position(this.element.nativeElement);
            const coordinate = {
                x: position.left,
                y: position.top
            };
            this.render(coordinate);
            console.log(coordinate);
        });
    }

    @HostListener('blur', ['$event'])
    onBlur(event) {
        if (!event.relatedTarget || !UiElement.is(event.relatedTarget, 'ui-select-option')) {
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
            const windowWidth = window.innerWidth + document.body.scrollLeft;
            const windowHeight = document.body.clientHeight + document.body.scrollTop;

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

            // if (this.themeClass) {
            //     element.classList.add(this.themeClass);
            // }

            element.style.transform = '';
            // element.querySelector('ui-card').style.maxHeight = window.innerHeight + 'px';
            element.style.top = coordinate.y + 'px';
            element.style.left = coordinate.x + 'px';
            element.style.left = coordinate.x + 'px';
            element.style.width = this.element.nativeElement.clientWidth + 'px';

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
}

