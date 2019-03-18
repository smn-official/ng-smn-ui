import {UiElement} from '../utils/providers/element.provider';

UiElement.on(window, 'scroll resize', (e) => {
    const fabContainers = document.querySelectorAll('.ui-fab-container');

    const len = fabContainers.length;

    if (len) {
        const scroll = (window.scrollY || window.pageYOffset);

        for (let i = 0; i < len; i++) {
            const fabContainer = fabContainers[i];

            if (scroll > 1) {
                fabContainer.classList.add('scrolled');
            } else {
                fabContainer.classList.remove('scrolled');
            }
        }
    }
});
