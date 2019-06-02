// RxJS v6+
import { withLatestFrom, map, take, startWith } from 'rxjs/operators';
import { interval } from 'rxjs';

//emit every 5s
export const withLatestFromSource1 = interval(100).pipe(
  startWith('source'),
  take(5)
);
//emit every 1s
export const withLatestFromSource2 = interval(300).pipe(
  startWith('secondSource'),
  take(10)
);

//withLatestFrom slower than source
const example = withLatestFromSource2.pipe(
  //both sources must emit at least 1 value (5s) before emitting
  withLatestFrom(withLatestFromSource1),
  map(([first, second]) => {
    return `Source (1s): ${first} Latest From (3s): ${second}`;
  })
);
/*
  "Source (1s): 4 Latest From (5s): 0"
  "Source (1s): 5 Latest From (5s): 0"
  "Source (1s): 6 Latest From (5s): 0"
  ...
*/
// const subscribe = example.subscribe(val => console.log(val));
