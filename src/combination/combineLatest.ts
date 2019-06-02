import { timer, combineLatest } from 'rxjs';
import { map, tap, take, startWith } from 'rxjs/operators';

// timerOne emits first value at 1s, then once every 4s
export const timerOnecombineLatest$ = timer(100, 400).pipe(take(5));
// timerTwo emits first value at 2s, then once every 4s
export const timerTwocombineLatest$ = timer(500, 400).pipe(
  startWith('foobar'),
  take(5),
  map(it => `f: ${it}`)
);
// timerThree emits first value at 3s, then once every 4s
export const timerThreecombineLatest$ = timer(300, 400).pipe(take(5));

combineLatest(
  timerOnecombineLatest$,
  timerTwocombineLatest$,
  timerThreecombineLatest$
).pipe(
  map(([timerValOne, timerValTwo, timerValThree]) => {
    return {
      timerValOne,
      timerValTwo,
      timerValThree
    };
  }),
  tap(it => console.log('Tap: : ', it))
);

// .subscribe(value => {
//   console.log('TCL: value', value);
//   /*
//     Example:
//   timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
//   timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
//   timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
// */
// console.log(
//   `Timer One Latest: ${value.timerValOne},
//    Timer Two Latest: ${value.timerValTwo},
//    Timer Three Latest: ${value.timerValThree}`
// );
// });
