// RxJS v6+
import { take, map, delay, mergeAll, mapTo } from 'rxjs/operators';
import { interval } from 'rxjs';

const source1 = interval(500).pipe(
  take(2),
  map(i => `source1: ${i}`)
);

const source2 = interval(500).pipe(
  take(2),
  map(i => `source2: ${i}`)
);

/*
  interval is emitting a value every 0.5s.  This value is then being mapped to interval that
  is delayed for 1.0s.  The mergeAll operator takes an optional argument that determines how
  many inner observables to subscribe to at a time.  The rest of the observables are stored
  in a backlog waiting to be subscribe.
*/
const example = source1
  .pipe(
    map(val => source2),
    mergeAll()
  )
  .subscribe(val => console.log(val));
/*
  The subscription is completed once the operator emits all values.
*/
