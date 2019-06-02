import { interval, of, concat } from 'rxjs';
import { take } from 'rxjs/operators';

export const concatData1 = interval(100).pipe(take(3));
export const concatData2 = of('This', 'Never', 'Runs');
export const concatData3 = interval(100).pipe(take(3));

concat(concatData1, concatData2, concatData3);
// log: 1,2,3,4.....
// .subscribe(console.log);
