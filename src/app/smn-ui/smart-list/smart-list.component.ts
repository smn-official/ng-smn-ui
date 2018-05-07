import {
    Component, OnInit, Input, DoCheck, KeyValueDiffers, Output, EventEmitter, OnChanges,
    ElementRef
} from '@angular/core';

@Component({
    selector: 'ui-smart-list',
    templateUrl: 'smart-list.component.html',
    styleUrls: ['smart-list.component.scss']
})

export class UiSmartListComponent implements OnInit, DoCheck, OnChanges {
    @Input() model: any;
    @Input('default-item') defaultItem: any;
    @Input('auto-delete-exception') autoDeleteException: any;
    @Output() modelChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    list: any[];
    differ: any;
    objDiffer: { string?: any };
    currentFocusedElementIndex: any;

    constructor(private differs: KeyValueDiffers, public element: ElementRef) {
        this.differ = differs.find([]).create();
    }

    ngOnInit() {
        if (!this.defaultItem) {
            this.defaultItem = {};
        }
        this.list = [Object.assign({}, this.defaultItem)];
        if (!this.model) {
            console.error('Você precisa declarar a model no seu componente');
        }
        this.objDiffer = {};
        this.list.forEach((elt, i) => {
            this.objDiffer[i] = this.differs.find(elt).create();
        });
        this.model.forEach((item) => {
            this.list.push(item);
        });
    }

    ngDoCheck() {
        let wasChanged = false;

        this.list.forEach((elt, i) => {
            let objDiffer = this.objDiffer[i];
            if (!objDiffer) {
                objDiffer = this.objDiffer[i] = this.differs.find(elt).create();
            }
            const objChanges = objDiffer.diff(elt);
            if (objChanges) {
                wasChanged = true;
                objChanges.forEachChangedItem((elt2) => {
                    if (!elt2.currentValue && typeof elt2.currentValue !== 'number' && typeof elt2.currentValue !== 'boolean' && !elt[this.autoDeleteException]) {
                        delete elt[elt2.key];
                    }
                });

                if (elt && this.model.indexOf(elt) < 0 && (Object.keys(elt).length > Object.keys(this.defaultItem).length)) {
                    this.model.push(elt);
                }

                if (elt && (Object.keys(elt).length === Object.keys(this.defaultItem).length) && equals(elt, this.defaultItem) && this.model.length && this.model.indexOf(elt) > -1 && !elt[this.autoDeleteException]) {
                    this.model.splice(this.model.indexOf(elt), 1);
                }
            }
        });

        if (wasChanged) {
            this.newItem();
        }
    }

    newItem() {
        let found = 0;

        this.list.forEach((item) => {
            if (item && (Object.keys(item).length <= Object.keys(this.defaultItem).length) && equals(item, this.defaultItem)) {
                found++;
                const element = this.list[this.list.indexOf(item)];
                this.list.splice(this.list.indexOf(item), 1);
                this.list.splice(this.list.length, 0, element);
            }
        });

        if (!found) {
            this.list.push(Object.assign({}, this.defaultItem));
        } else {
            setTimeout(() => {
                this.list.splice(this.list.length - 1, 1);
                this.newItem();
            });
        }
    }

    remove(i) {
        Object.keys(this.list[i]).forEach((key) => {
            if (!Object.keys(this.defaultItem).includes(key)) {
                delete this.list[i][key];
            } else {
                this.list[i][key] = this.defaultItem[key];
            }
        });
        this.ngDoCheck();
    }

    ngOnChanges(changes) {
        if (changes.model && changes.model.currentValue) {
            if (changes.model.currentValue.length) {
                changes.model.currentValue.forEach((item) => {
                    if (this.list && this.list.indexOf(item) === -1) {
                        this.list.push(item);
                    }
                });
            } else if (changes.model.currentValue && changes.model.previousValue) {
                this.list = [Object.assign({}, this.defaultItem)];
            }
        }
    }
}


function equals(x, y) {
    return JSON.stringify(x) === JSON.stringify(y);
}
