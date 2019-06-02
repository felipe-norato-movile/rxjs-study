// RxJS v6+
import { take, concatAll, map } from 'rxjs/operators';
import { interval, of } from 'rxjs';

const obs1 = interval(1000).pipe(
  take(5),
  map(val => `obs1: ${val}`)
);
const obs2 = interval(50).pipe(
  take(10),
  map(val => `obs2: ${val}`)
);
const obs3 = interval(2000).pipe(
  take(1),
  map(val => `obs3: ${val}`)
);
//emit three observables
const source = of(obs1, obs2, obs3);
//subscribe to each inner observable in order when previous completes
const example = source.pipe(concatAll());
/*
  output: 0,1,2,3,4,0,1,0
  How it works...
  Subscribes to each inner observable and emit values, when complete subscribe to next
  obs1: 0,1,2,3,4 (complete)
  obs2: 0,1 (complete)
  obs3: 0 (complete)
*/

const subscribe = example.subscribe(val => console.log(val));
