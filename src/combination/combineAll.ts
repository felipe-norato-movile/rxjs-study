import { take, map, combineAll, tap } from 'rxjs/operators';
import { interval, combineLatest } from 'rxjs';

export const source1combineAll = interval(200).pipe(
  // tap(it => console.log('Tap: source1: ', it)),
  take(3)
);

export const source2combineAll = interval(100).pipe(take(2));
const example = source1combineAll.pipe(
  map(val =>
    source2combineAll.pipe(
      // tap(it => console.log('Tap: source2: ', it)),
      map(i => `Result (${val}): ${i}`)
    )
  ),
  combineAll()
);
// .subscribe(console.log);

// const combined = example.pipe(combineAll());
// const subscribe = combined.subscribe(val => {
//   console.log('TCL: val', val);
// });

// combineLatest(source1combineAll, source2combineAll).subscribe(console.log);
