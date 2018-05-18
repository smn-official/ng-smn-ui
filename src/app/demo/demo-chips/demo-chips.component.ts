import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-inputs',
    templateUrl: './demo-chips.component.html',
    styleUrls: ['./demo-chips.component.scss']
})
export class DemoChipsComponent implements OnInit {
    chips;
    selectedChips;

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        this.chips = [];
        this.selectedChips = [];
    }

    ngOnInit() {
        this.titleService.setTitle('Chip - SMN UI Demos');
        this.toolbarService.set('Chip');

        this.loadChips();
    }

    loadChips() {
        const chips = [
            {
                id: 1,
                name: 'Teste 1'
            },
            {
                id: 2,
                name: 'Teste 2'
            },
            {
                id: 3,
                name: 'Teste 3'
            }
        ];

        this.selectedChips.forEach(selectedChip => {
            chips.forEach((chip, i) => {
                if (chip.id === selectedChip.id) {
                    chips.splice(i, 1);
                }
            });
        });

        this.chips = chips;
    }

    loadMoreChips() {

    }

    chipSelect(chip) {
        this.selectedChips.push(chip);
        setTimeout(() => {
            delete this.chips.searchState;
        });
    }

    removeChip(chip) {
        this.selectedChips.splice(this.selectedChips.indexOf(chip), 1);
    }
}
