import {Component, Input, OnInit, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'ui-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    @Input() ngModel: Date;

    days: any;
    shortDays: any;
    months: any;
    shortMonths: any;
    viewDate: Date;
    constructor(public componentFactoryResolver: ComponentFactoryResolver, public viewContainerRef: ViewContainerRef) {
        this.days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
        this.shortDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
        this.months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'];
        this.shortMonths = ['Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        // console.log(componentFactoryResolver.resolveComponentFactory(''));
    }

    ngOnInit(): void {
        this.ngModel = this.ngModel ? new Date(this.ngModel) : this.ngModel;
        this.viewDate = this.ngModel;
    }
    prevMonth(): void {
        // Render
    }
    nextMonth(): void {
        // Render
    }


}
