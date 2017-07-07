import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ui-list',
    templateUrl: 'list.component.html'
})

export class UiListComponent implements OnInit {
    @Input() list: any;
    @Input('item-model') itemModel: any;

    constructor() {
    }

    ngOnInit() {
        if (!this.list) {
            console.error('É obrigatório fornecer a model "list"');
            return false;
        }

        if (!this.itemModel) {
            this.itemModel = {
                id: 'id',
                parentId: 'parentId',
                name: 'name',
                url: 'url'
            };
        }

        this.list.forEach(item => {

        });

        console.log(this.list);
        console.log(this.itemModel);
    }
}
/**/
