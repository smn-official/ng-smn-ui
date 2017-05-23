import { Injectable, PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'uistringdate',
	pure: false
})

export class DatePipe implements PipeTransform {
	transform(date: Date) {
		if (!date) {
			console.error('(SMNUI4) Data inválida - [Pipe uistringdate]');
			return date;
		}
		const today = new Date(),
			yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
			months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
			weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
			sevenDaysInMil = 1000 * 60 * 60 * 24 * 7;
		today.setHours(0, 0, 0, 0);
		yesterday.setHours(0, 0, 0, 0);
		date = new Date(date);
		date.setHours(0, 0, 0, 0);
		switch (true) {
			case today.getTime() === date.getTime():
				return 'Hoje';
			case yesterday.getTime() === date.getTime():
				return 'Ontem';
			case today.getTime() - sevenDaysInMil <= date.getTime():
				return weekDays[date.getDay()];
			default:
				return date.getDate() + ' de ' + months[date.getMonth()].toLowerCase() + ' de ' + date.getFullYear();
		}
	};
}