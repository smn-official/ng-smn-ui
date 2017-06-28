import {Component, OnInit, Input, DoCheck, KeyValueDiffers} from '@angular/core';

@Component({
    selector: 'ui-smart-list',
    templateUrl: 'smart-list.component.html'
})

export class UiSmartListComponent implements OnInit, DoCheck {
    @Input() model: any;
    list: any[];
    differ: any;
    objDiffer: { string?: any };

    constructor(private differs: KeyValueDiffers) {
        this.list = [{}];
        this.differ = differs.find([]).create(null);
    }

    ngOnInit() {
        if (!this.model) {
            console.error('Você precisa declarar a model no seu componente');
        }
        this.objDiffer = {};
        this.list.forEach((elt, i) => {
            this.objDiffer[i] = this.differs.find(elt).create(null);
        });
    }

    ngDoCheck() {
        let wasChanged = false;

        this.list.forEach((elt, i) => {
            let objDiffer = this.objDiffer[i];
            if (!objDiffer) {
                objDiffer = this.objDiffer[i] = this.differs.find(elt).create(null);
            }
            const objChanges = objDiffer.diff(elt);
            if (objChanges) {
                wasChanged = true;
                objChanges.forEachChangedItem((elt2) => {
                    if (!elt2.currentValue && typeof elt2.currentValue !== 'number') {
                        delete elt[elt2.key];
                    }
                });

                if (elt && this.model.indexOf(elt) < 0 && (Object.keys(elt).length > 0)) {
                    this.model.push(elt);
                }

                if (elt && (Object.keys(elt).length === 0) && this.model.length && this.model.indexOf(elt) > -1) {
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
            if (item && (Object.keys(item).length === 0)) {
                found++;
                const element = this.list[this.list.indexOf(item)];
                this.list.splice(this.list.indexOf(item), 1);
                this.list.splice(this.list.length, 0, element);
            }
        });

        if (!found) {
            this.list.push({});
        } else {
            setTimeout(() => {
                this.list.splice(this.list.length - 1, 1);
                this.newItem();
            });
        }
    }

    remove(i) {
        Object.keys(this.list[i]).forEach((key) => {
            delete this.list[i][key];
        });
        this.newItem();
    }
}
