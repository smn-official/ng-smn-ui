import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ui-list',
    templateUrl: 'list.component.html',
    encapsulation: ViewEncapsulation.None
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
                url: 'url',
                icon: 'icon'
            };
        }

        this.list.forEach(item => {
            Object.keys(this.itemModel).forEach((key) => {
                const old_key = this.itemModel[key];
                renameObjectKey(item, old_key, key);
            });
        });

        this.list = iteratePristineMenu(this.list);
    }
}

function iteratePristineMenu(allItems) {
    const remainingList = [];
    const newMenu = allItems.filter(function (item) {
        if (item.parentId !== null) {
            remainingList.push(item);
        }
        return item.parentId === null;
    });
    return iterateOptionsMenu(newMenu, remainingList)[0];
}

function iterateOptionsMenu(list, fullList) {
    let remainingList;
    for (let i = 0; i < list.length; i++) {
        remainingList = [];
        const target = list[i];
        const subMenus = fullList.filter(item => {
            if (item.parentId !== target.id) {
                remainingList.push(item);
            }
            return item.parentId === target.id;
        });
        if (subMenus.length) {
            target.childs = subMenus;
            remainingList = iterateOptionsMenu(target.childs, remainingList)[1];
        }
    }
    return [list, remainingList];
}

function renameObjectKey(obj, oldName, newName) {
    if (!obj.hasOwnProperty(oldName) || oldName === newName) {
        return false;
    }

    obj[newName] = obj[oldName];
    delete obj[oldName];
    return true;
}
