import { Pipe, PipeTransform  } from '@angular/core';


@Pipe({
    name: 'bytes'
})
export class BytesPipe implements PipeTransform {

    transform (input: any, decimal: number = 0): any {

        const formats = [
            { name: 'B', max: 1024 },
            { name: 'KB', max: 1048576 },
            { name: 'MB', max: 1073741824 },
            { name: 'GB', max: Number.MAX_VALUE }
        ];

        if (isNumberFinite(input) &&
            isNumberFinite(decimal) &&
            isInteger(decimal) &&
            isPositive(decimal)) {

                for (let i = 0; i < formats.length; ++i) {
                    const format = formats[i];
                    if (input < format.max) {

                        const bytes = formats[i - 1] ?
                                      toDecimal(input / formats[i - 1].max, decimal) :
                                      toDecimal(input, decimal);

                        return `${bytes} ${format.name}`;
                    }

                }

        }
        else {
            return input;
        }
    }
}

function isNumberFinite (value: any): boolean {
    return typeof value === 'number' && isFinite(value);
}

function isInteger (value: number): boolean {
    // No rest, is an integer
    return (value % 1) === 0;
}

function isPositive (value: number): boolean {
    return value >= 0;
}

function toDecimal (value: number, decimal: number): number {
    return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
}