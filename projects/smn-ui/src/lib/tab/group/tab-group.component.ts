import {
    AfterViewInit, ChangeDetectorRef, Component, ContentChildren, ElementRef, Input, OnInit,
    QueryList
} from '@angular/core';
import {UiTabComponent} from '../tab.component';

@Component({
    selector: 'ui-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss']
})
export class UiTabGroupComponent implements OnInit, AfterViewInit {
    @ContentChildren(UiTabComponent) tabsQueryList: QueryList<UiTabComponent>;
    @Input() active: number;

    tabs: any[];
    activatedTab: UiTabComponent;

    constructor(private changeDetectorRef: ChangeDetectorRef, private element: ElementRef) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        // Transformando a QueryList em um array de component(UiTabComponent)
        this.tabs = this.tabsQueryList.toArray();
        this.changeDetectorRef.detectChanges();
        this.generateIndexes();
        // Ativa uma tab através do index passado com Input ou a primeira tab
        this.activateTab(this.tabs[this.active || 0]);

        this.compileTabTemplate();

        this.tabsQueryList.changes.subscribe(newTabs => {
            this.tabs = newTabs.toArray();
            this.generateIndexes();

            // Verificando se a tab selecionada foi removida da lista
            if (!this.tabs.includes(this.activatedTab)) {
                // Ativando a tab que ficou no mesmo index da última tab ativa
                const newTab = this.tabs[this.activatedTab.index] || this.tabs[this.tabs.length - 1];
                this.activateTab(newTab);
            }
        });
    }

    /**
     * Atribuí os index para as tabs
     * @return {void}
     **/
    generateIndexes() {
        this.tabs.map((tab, index) => tab.index = index);
    }

    /**
     * Ativa uma tab
     * @param tab {UiTabComponent} - Tab a ser ativada
     * @return {void}
     * */
    activateTab(tab: UiTabComponent) {
        if (this.activatedTab) {
            this.activatedTab.tabChange.emit(false);
        }

        tab.tabChange.emit(true);
        this.changeDetectorRef.detectChanges();

        this.activatedTab = tab;

        this.updateActivatedTab();
    }

    /**
     * Altera em todos components(UiTabComponent) o index da nova tab ativada
     * @return {void}
     **/
    updateActivatedTab() {
        this.tabs.map(tab => tab.indexActivatedTab = this.activatedTab.index);
    }

    /**
     * Compila um template customizado
     * @return {void}
    **/
    compileTabTemplate () {
        this.tabs.forEach((tab, index) => {
            /*
            * Verificando se a tab tem template e se tem 2 templates
            * porque um é para o lazy load e o outro para uma tab customizada
            * */
            if (tab.templatesRef.length !== 2) {
                return;
            }

            setTimeout(() => {
                // Compilando o template
                const viewRef = tab.generateTemplate(tab.templatesRef.first);

                // Colocando os elementos do template na tab
                viewRef.rootNodes.forEach(node => {
                    this.element.nativeElement.querySelectorAll('.tabs .tab')[index].appendChild(node);
                });
            });
        });
    }
}
