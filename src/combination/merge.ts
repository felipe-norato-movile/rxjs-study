// RxJS v6+
import { mapTo, take } from 'rxjs/operators';
import { interval, merge } from 'rxjs';

//emit every 2.5 seconds
const first = interval(2500).pipe(take(5));
//emit every 2 seconds
const second = interval(2000).pipe(take(5));
//emit every 1.5 seconds
const third = interval(1500).pipe(take(5));
//emit every 1 second
const fourth = interval(1000).pipe(take(5));

//emit outputs from one observable
const example = merge(
  first.pipe(mapTo('FIRST!')),
  second.pipe(mapTo('SECOND!')),
  third.pipe(mapTo('THIRD')),
  fourth.pipe(mapTo('FOURTH'))
);
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
const subscribe = example.subscribe(val => console.log(val));
