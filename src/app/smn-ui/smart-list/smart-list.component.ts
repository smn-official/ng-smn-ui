import {
    Component, OnInit, ElementRef, Input, IterableDiffers, OnChanges, DoCheck, IterableDiffer,
    KeyValueDiffers
} from '@angular/core';
import {Observable} from 'rxjs/Observable';

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
        this.objDiffer = {};
        this.list.forEach((elt, i) => {
            this.objDiffer[i] = this.differs.find(elt).create(null);
        });
    }

    ngDoCheck() {
        this.list.forEach((elt, i) => {
            let objDiffer = this.objDiffer[i];
            if (!objDiffer) {
                objDiffer = this.objDiffer[i] = this.differs.find(elt).create(null);
            }
            const objChanges = objDiffer.diff(elt);
            if (objChanges) {
                objChanges.forEachChangedItem((elt2) => {
                    if (!elt2.currentValue) {
                        delete elt[elt2.key];
                    }
                });
            }

            console.log(elt);

            if (elt && this.model.indexOf(elt) < 0 && (Object.keys(elt).length > 0)) {
                this.model.push(elt);
            }

            if (elt && (Object.keys(elt).length === 0) && this.model.length && this.model.indexOf(elt) > -1) {
                this.model.splice(this.model.indexOf(elt), 1);
            }
        });
    }

    newItem() {
        let found = false;

        this.list.forEach((item) => {
            if (!found && item && (Object.keys(item).length === 0)) {
                found = true;
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
                this.list.push({});
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
