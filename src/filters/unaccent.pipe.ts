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
        var strAccents = data.split('');
        var strAccentsOut = [];
        var strAccentsLen = strAccents.length;
        var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
        var accentsOut = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz';
        for (var y = 0; y < strAccentsLen; y++) {
            if (accents.indexOf(strAccents[y]) != -1) {
                strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
            } else
                strAccentsOut[y] = strAccents[y];
        }
        return strAccentsOut.join('');
    }
}