import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { UiElementRef } from '../utils/providers/element-ref.provider';

@Component({
    selector: 'ui-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UiBottomSheetComponent {
    @Input('card-size') cardSize: number;
    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;
    @Output() closeChange: EventEmitter<any> = new EventEmitter();

    viewRef;
    opened;

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
                        if (rootNode.remove) {
                            rootNode.remove();
                        } else {
                            rootNode.parentNode.removeChild(rootNode);
                        }
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
            setTimeout(() => {
                const card = element.querySelector('ui-card');
                card.className += ` ${this.elementRef.nativeElement.className}`;

                if (config.themeClass) {
                    element.classList.add(config.themeClass);
                }
                if (config.transparentOverlay) {
                    element.classList.add('transparent-overlay');
                }
                if (config.cardSize) {
                    card.style.maxWidth = config.cardSize + 'px';
                }
                if (!config.transparentOverlay && config.fabs) {
                    config.fabs.classList.add('hide');
                }

                element.querySelectorAll('.overlay')[0].addEventListener('click', () => {
                    this.close();
                });

                element.style.transform = '';

                element.classList.add('open');

                // UiElement.disableScroll();
            });
        });
    }
}
