import { Injectable, PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'uiunaccent',
	pure: false
})

export class UnaccentPipe implements PipeTransform {
	transform(data: any) {
		if (!data) {
			return data;
		}
		const strAccents = data.split('');
		const strAccentsOut = [];
		const strAccentsLen = strAccents.length;
		const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
		const accentsOut = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
		for (let y = 0; y < strAccentsLen; y++) {
			if (accents.indexOf(strAccents[y]) !== -1) {
				strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
			}
			strAccentsOut[y] = strAccents[y];
		}
		return strAccentsOut.join('');
	}
}