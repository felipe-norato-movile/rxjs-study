// RxJS v6+
import { interval } from 'rxjs';
import { map, mergeAll, take } from 'rxjs/operators';

export const mergeAllSource1 = interval(500).pipe(
  take(2),
  map(i => `source1: ${i}`)
);

export const mergeAllSource2 = interval(500).pipe(
  take(2),
  map(i => `source2: ${i}`)
);

export const mergeAllSource3 = interval(500).pipe(
  take(2),
  map(i => `source3: ${i}`)
);

/*
  interval is emitting a value every 0.5s.  This value is then being mapped to interval that
  is delayed for 1.0s.  The mergeAll operator takes an optional argument that determines how
  many inner observables to subscribe to at a time.  The rest of the observables are stored
  in a backlog waiting to be subscribe.
*/
const example = mergeAllSource1.pipe(
  map(val => mergeAllSource2),
  mergeAll()
);
// .subscribe(val => console.log(val));
/*
  The subscription is completed once the operator emits all values.
*/
