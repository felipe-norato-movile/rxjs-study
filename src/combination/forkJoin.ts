// RxJS v6+
import { delay, take, map, startWith } from 'rxjs/operators';
import { forkJoin, of, interval } from 'rxjs';

const myPromise = val =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
  );

/*
  when all observables complete, give the last
  emitted value from each as an array
*/
const example = forkJoin(
  //emit 'Hello' immediately
  of('Hello'),
  //emit 'World' after 1 second
  of('World').pipe(
    delay(1000),
    take(5)
  ),
  //emit 0 after 1 second
  interval(5000).pipe(
    startWith('interval1 not started'),
    take(1),
    map(it => `interval1: ${it}`)
  ),
  //emit 0...1 in 1 second interval
  interval(1000).pipe(
    startWith('interval2 not started'),
    take(2),
    map(it => `interval2: ${it}`)
  ),
  //promise that resolves to 'Promise Resolved' after 5 seconds
  myPromise('RESULT')
);
//output: ["Hello", "World", 0, 1, "Promise Resolved: RESULT"]
const subscribe = example.subscribe(val => console.log(val));
