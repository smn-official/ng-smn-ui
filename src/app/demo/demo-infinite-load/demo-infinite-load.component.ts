import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';
import {UiInfiniteLoadService} from '../../../../projects/smn-ui/src/lib/utils/infinite-load/infinite-load.service';

@Component({
    selector: 'demo-infinite-load',
    templateUrl: './demo-infinite-load.component.html',
    styleUrls: ['./demo-infinite-load.component.scss']
})
export class DemoInfiniteLoadComponent implements OnInit, OnDestroy, AfterViewInit {
    items;
    items2;

    constructor(private titleService: Title, private toolbarService: UiToolbarService, private infiniteLoad: UiInfiniteLoadService) {
        // O InfiniteLoad só é injetado quando você vai utilizar o infinite load no body
        this.items = [{}, {}, {}, {}, {}, {}];
        this.items2 = [{}, {}, {}, {}, {}, {}];
    }

    ngOnInit() {
        this.titleService.setTitle('Infinite load - SMN UI Demos');
        this.toolbarService.set('Infinite load');
    }

    ngAfterViewInit() {
        // Utilizando o InfiniteLoad no body
        this.infiniteLoad.register(window, () => {
            this.loadMore2();
        });
    }

    ngOnDestroy() {
        // Nunca se esqueça de remover a instância do Infinite Load se você utilizou no body
        this.infiniteLoad.destroy();
    }

    loadMore() {
        const items = [{}, {}, {}, {}, {}, {}];

        this.items = [...this.items, ...items];
    }

    loadMore2() {
        const items = [{}, {}, {}, {}, {}, {}];

        this.items2 = [...this.items2, ...items];
    }
}
