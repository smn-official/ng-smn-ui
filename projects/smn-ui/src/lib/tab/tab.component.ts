import {
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {UiTabContentDirective} from './tab-content.directive';
import {UiTabLabelDirective} from './tab-label.directive';
import {Subscription} from 'rxjs';

@Component({
    selector: 'ui-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class UiTabComponent implements OnInit, OnDestroy {
    @ViewChild('tabContent') tabContent: TemplateRef<any>;
    @ContentChild(UiTabContentDirective) templateContent: UiTabContentDirective;
    @ContentChild(UiTabLabelDirective) templateLabel: UiTabLabelDirective;
    @Input() label: string;
    @Input() icon: string;
    @Input() disabled: string;
    private subscription: Subscription;
    isActive: boolean;
    index: number;
    indexActivatedTab: number;
    tabChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    loaded: boolean;

    constructor(private viewContainer: ViewContainerRef, private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.subscription = this.tabChange.subscribe(value => {
            if (value) {
                this.loaded = true;
            }
            this.isActive = value;
            this.changeDetectorRef.detectChanges();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
