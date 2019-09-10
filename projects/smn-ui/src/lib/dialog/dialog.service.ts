import {Injectable} from '@angular/core';
import {UiDialogComponent} from './dialog.component';
import {UiElementRef} from '../utils/providers/element-ref.provider';

let viewRef;

@Injectable()
export class UiDialog {

    public static show(dialog: UiDialogComponent, config?: any) {
        UiDialog.hide();
        config = config || {};

        if (config.clickOverlayToClose === undefined) {
            config.clickOverlayToClose = true;
        } else if (config.clickOverlayToClose) {
            config.clickOverlayToClose = JSON.parse(config.clickOverlayToClose);
        }

        viewRef = dialog.templateRef.createEmbeddedView(dialog.templateRef);
        viewRef.detectChanges();

        viewRef.rootNodes.forEach(rootNode => {
            document.body.appendChild(rootNode);

            if (rootNode.clientWidth) {
                UiDialog.open(rootNode, config);
            }
        });
    }

    private static open(element, config) {
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
            if (config.cardSize) {
                element.querySelector('ui-card').style.maxWidth = config.cardSize + 'px';
                element.querySelector('ui-card').style.width = '100%';
            }

            if (!config.transparentOverlay && fabs.length) {
                fabs.classList.add('hide');
            }

            if (config.clickOverlayToClose) {
                element.querySelector('.overlay').addEventListener('click', () => {
                    if (typeof config.onClose === 'function') {
                        config.onClose();
                    }
                    UiDialog.hide();
                });
            }

            element.style.transform = '';

            element.classList.add('open');

            document.body.style.overflowY = 'hidden';
        });
    }

    public static hide() {
        if (viewRef) {
            const fabs = new UiElementRef(document).querySelector('.ui-fab-container');

            if (fabs.length) {
                fabs.classList.remove('hide');
            }

            viewRef.rootNodes.forEach(rootNode => {
                if (rootNode.classList) {
                    rootNode.classList.remove('open');
                }
            });

            setTimeout(() => {
                viewRef.rootNodes.forEach(rootNode => {
                    if (rootNode.remove) {
                        rootNode.remove();
                    } else {
                        rootNode.parentNode.removeChild(rootNode);
                    }
                });
                viewRef.destroy();
                viewRef = null;
            }, 280);

            document.body.style.overflowY = '';
        }
    }

}
