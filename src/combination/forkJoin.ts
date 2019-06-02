// RxJS v6+
import { delay, take, map, startWith } from 'rxjs/operators';
import { forkJoin, of, interval } from 'rxjs';

export const forkJoinData1$ = of('Hello');
export const forkJoinData2$ = of('World').pipe(
  delay(1000),
  take(5)
);
export const forkJoinData3$ = interval(5000).pipe(
  startWith('interval1 not started'),
  take(1),
  map(it => `interval1: ${it}`)
);
export const forkJoinData4$ = interval(1000).pipe(
  startWith('interval2 not started'),
  take(2),
  map(it => `interval2: ${it}`)
);
/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin(
  //emit 'Hello' immediately
  forkJoinData1$,
  //emit 'World' after 1 second
  forkJoinData2$,
  //emit 0 after 1 second
  forkJoinData3$,
  //emit 0...1 in 1 second interval
  forkJoinData4$
);
//output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
// const subscribe = example.subscribe(val => console.log(val));
