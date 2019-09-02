import {
    AfterViewInit, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {UiTabContentDirective} from './tab-content.directive';
import {UiTabLabelDirective} from './tab-label.directive';

@Component({
    selector: 'ui-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class UiTabComponent implements OnInit, AfterViewInit {
    @ContentChild(UiTabContentDirective) templateContent: TemplateRef<any>;
    @ContentChild(UiTabLabelDirective) templateLabel: TemplateRef<any>;
    @Input() label: string;
    @Input() icon: string;
    @Input() disabled: string;
    isActive: boolean;
    index: number;
    indexActivatedTab: number;
    tabChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    loaded: boolean;

    constructor(private viewContainer: ViewContainerRef,
                private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.tabChange.subscribe(value => {
            if (value) {
                this.loaded = true;
            }
            this.isActive = value;
            this.changeDetectorRef.detectChanges();
        });
    }

    ngAfterViewInit() {
        console.log(this.templateContent)
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
