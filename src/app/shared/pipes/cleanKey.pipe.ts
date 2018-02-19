import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'cleanKey'})
export class CleanKeyPipe implements PipeTransform {
    public transform(input: string): string {
        if (!input) {
            return '';
        } else {
            const wordList = input.split('_');
            const lowerWords = ['on', 'of', 'to'];
            const upperWords = ['id'];
            let output = '';
            wordList.forEach(word => {
                const space = output.length > 0 ? ' ' : '';
                if (lowerWords.indexOf(word) > -1) { output = output + space + word.toLowerCase();
                } else if (upperWords.indexOf(word) > -1) { output = output + space + word.toUpperCase();
                } else { output = output + space + word.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() )); }
            });
            return output;
        }
    }

}
