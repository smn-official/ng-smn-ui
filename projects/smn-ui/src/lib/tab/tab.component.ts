import {
    AfterViewInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren, ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'ui-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class UiTabComponent implements OnInit, AfterViewInit {
    @ContentChildren(TemplateRef) templatesRef: QueryList<TemplateRef<any>>;
    @Input() label: string;
    @Input() icon: string;
    @Input() disabled: string;
    isActive: boolean;
    index: number;
    indexActivatedTab: number;
    tabChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private viewContainer: ViewContainerRef, private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.tabChange.subscribe(value => {
            this.isActive = value;
            this.changeDetectorRef.detectChanges();
        });
    }

    ngAfterViewInit() {
    }

    /**
     * Compila um template
     * @param {TemplateRef} template - Template a ser compilado
     * @return {ViewRef}
    **/
    generateTemplate(template: TemplateRef<any>) {
        return this.viewContainer.createEmbeddedView(template);
    }

}
