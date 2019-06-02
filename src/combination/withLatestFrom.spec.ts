import { Observable, interval } from 'rxjs';
import { withLatestFrom, tap, take } from 'rxjs/operators';
import { testSubscription } from './helper.tests';
import { withLatestFromSource1, withLatestFromSource2 } from './withLatestFrom';

describe('withLatestFrom', () => {
  let subject: Observable<any>;
  let position: number;
  let expected: any;

  beforeEach(() => {
    position = 0;
    subject = null;
  });

  it('should receives an array of source and second source', done => {
    expected = [['secondSource', 'source'], [0, 1]];

    subject = withLatestFromSource2.pipe(withLatestFrom(withLatestFromSource1));

    testSubscription(subject, position, expected, done);
  });

  it('should receives an array of source and second and third source', done => {
    expected = [[0, 0, 0], [1, 1, 1]];
    const data1$ = interval(50).pipe(take(2));
    const data2$ = interval(50).pipe(take(2));
    const data3$ = interval(50).pipe(take(2));

    subject = data1$.pipe(withLatestFrom(data2$, data3$));

    testSubscription(subject, position, expected, done);
  });

  it('should receives an object of source and second and third source', done => {
    expected = [
      { dataA: 0, dataB: 0, dataC: 0 },
      { dataA: 1, dataB: 1, dataC: 1 }
    ];

    const data1$ = interval(50).pipe(take(2));
    const data2$ = interval(50).pipe(take(2));
    const data3$ = interval(50).pipe(take(2));

    subject = data1$.pipe(
      withLatestFrom(data2$, data3$, (a, b, c) => ({
        dataA: a,
        dataB: b,
        dataC: c
      }))
    );

    testSubscription(subject, position, expected, done);
  });
});
