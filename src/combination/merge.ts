// RxJS v6+
import { mapTo, take } from 'rxjs/operators';
import { interval, merge } from 'rxjs';

export const mergeFirst = interval(250).pipe(take(5));
export const mergeSecond = interval(200).pipe(take(5));
export const mergeThird = interval(150).pipe(take(5));
export const mergeFourth = interval(100).pipe(take(5));

//emit outputs from one observable
const example = merge(
  mergeFirst.pipe(mapTo('FIRST!')),
  mergeSecond.pipe(mapTo('SECOND!')),
  mergeThird.pipe(mapTo('THIRD')),
  mergeFourth.pipe(mapTo('FOURTH'))
);
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
// const subscribe = example.subscribe(val => console.log(val));
