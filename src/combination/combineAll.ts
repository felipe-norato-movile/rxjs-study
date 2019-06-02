import { take, map, combineAll, tap } from 'rxjs/operators';
import { interval } from 'rxjs';

//emit every 1s, take 2
const source = interval(1000).pipe(
  tap(it => console.log('Tap: source1: ', it)),
  take(3)
);

//map each emitted value from source to interval observable that takes 5 values
const example = source
  .pipe(
    map(val =>
      interval(1000).pipe(
        tap(it => console.log('Tap: source2: ', it)),
        take(2),
        map(i => `Result (${val}): ${i}`)
      )
    ),
    combineAll()
  )
  .subscribe(console.log);

// const combined = example.pipe(combineAll());
// const subscribe = combined.subscribe(val => {
//   console.log('TCL: val', val);
// });
