import {
    Component, ElementRef, Output, TemplateRef, ViewChild,
    ViewEncapsulation, EventEmitter, Input
} from '@angular/core';
import {UiElementRef} from '../utils/providers/element-ref.provider';

@Component({
    selector: 'ui-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiDialogComponent {
    viewRef: any;
    opened: boolean;
    @Input('card-size') cardSize: number;
    @Output() closeChange: EventEmitter<any> = new EventEmitter();
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    constructor(public elementRef: ElementRef) {
    }

    close() {
        this.opened = false;
        this.closeChange.emit();

        if (this.viewRef) {
            const fabs = new UiElementRef(document).querySelector('.ui-fab-container');

            if (fabs.length) {
                fabs.classList.remove('hide');
            }

            this.viewRef.rootNodes.forEach(rootNode => {
                if (rootNode.classList) {
                    rootNode.classList.remove('open');
                }
            });

            if (this.viewRef) {
                setTimeout(() => {
                    this.viewRef.rootNodes.forEach(rootNode => {
                        rootNode.remove();
                    });
                    this.viewRef.destroy();
                    this.viewRef = null;
                }, 280);
            }

            document.body.style.overflowY = '';
        }
    }

    show(config?: any) {
        if (!this.viewRef) {
            const dialog = this;

            this.close();
            config = config || {};

            if (config.clickOverlayToClose === undefined) {
                config.clickOverlayToClose = true;
            } else if (config.clickOverlayToClose) {
                config.clickOverlayToClose = JSON.parse(config.clickOverlayToClose);
            }

            this.viewRef = dialog.templateRef.createEmbeddedView(dialog.templateRef);
            this.viewRef.detectChanges();

            this.viewRef.rootNodes.forEach(rootNode => {
                document.body.appendChild(rootNode);

                if (rootNode.clientWidth) {
                    this.open(rootNode, config);
                }
            });
        }
    }

    open(element, config) {
        this.opened = true;
        setTimeout(() => {
            const fabs = new UiElementRef(document).querySelector('.ui-fab-container');

            if (config.darkClass) {
                element.classList.add(config.darkClass);
            }
            if (config.themeClass) {
                element.classList.add(config.themeClass);
            }
            if (config.transparentOverlay) {
                element.classList.add('transparent-overlay');
            }
            if (config.cardSize || this.cardSize) {
                element.querySelectorAll('ui-card')[0].style.maxWidth = (config.cardSize || this.cardSize) + 'px';
                element.querySelectorAll('ui-card')[0].style.width = '100%';
            }

            if (!config.transparentOverlay && fabs.length) {
                fabs.classList.add('hide');
            }

            if (config.clickOverlayToClose) {
                element.querySelectorAll('.overlay')[0].addEventListener('click', () => {
                    this.close();
                });
            }

            element.style.transform = '';

            element.classList.add('open');

            document.body.style.overflowY = 'hidden';
        });
    }
}
