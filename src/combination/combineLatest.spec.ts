import { Observable, combineLatest } from 'rxjs';
import {
  timerOnecombineLatest$,
  timerTwocombineLatest$,
  timerThreecombineLatest$
} from './combineLatest';
import { tap, map } from 'rxjs/operators';
import { testSubscription } from './helper.tests';

describe('combineLatest', () => {
  let subject: Observable<any>;
  let expected: any;
  let position;

  beforeEach(() => {
    position = 0;
  });

  it('should emits array of values', done => {
    expected = [
      [0, 'f: foobar', 0],
      [0, 'f: 0', 0],
      [1, 'f: 0', 0],
      [1, 'f: 0', 1],
      [1, 'f: 1', 1],
      [2, 'f: 1', 1],
      [2, 'f: 1', 2],
      [2, 'f: 2', 2],
      [3, 'f: 2', 2],
      [3, 'f: 2', 3],
      [3, 'f: 3', 3],
      [4, 'f: 3', 3],
      [4, 'f: 3', 4]
    ];

    subject = combineLatest(
      timerOnecombineLatest$,
      timerTwocombineLatest$,
      timerThreecombineLatest$
    );

    testSubscription(subject, position, expected, done);
  });

  it('should emits values as objects mapped', done => {
    expected = [
      { timerValOne: 0, timerValTwo: 'f: foobar', timerValThree: 0 },
      { timerValOne: 0, timerValTwo: 'f: 0', timerValThree: 0 },
      { timerValOne: 1, timerValTwo: 'f: 0', timerValThree: 0 },
      { timerValOne: 1, timerValTwo: 'f: 0', timerValThree: 1 },
      { timerValOne: 1, timerValTwo: 'f: 1', timerValThree: 1 },
      { timerValOne: 2, timerValTwo: 'f: 1', timerValThree: 1 },
      { timerValOne: 2, timerValTwo: 'f: 1', timerValThree: 2 },
      { timerValOne: 2, timerValTwo: 'f: 2', timerValThree: 2 },
      { timerValOne: 3, timerValTwo: 'f: 2', timerValThree: 2 },
      { timerValOne: 3, timerValTwo: 'f: 2', timerValThree: 3 },
      { timerValOne: 3, timerValTwo: 'f: 3', timerValThree: 3 },
      { timerValOne: 4, timerValTwo: 'f: 3', timerValThree: 3 },
      { timerValOne: 4, timerValTwo: 'f: 3', timerValThree: 4 }
    ];

    subject = combineLatest(
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
      })
    );

    testSubscription(subject, position, expected, done);
  });

  it('should emits values as objects by project function', done => {
    expected = [
      { timerValOne: 0, timerValTwo: 'f: foobar', timerValThree: 0 },
      { timerValOne: 0, timerValTwo: 'f: 0', timerValThree: 0 },
      { timerValOne: 1, timerValTwo: 'f: 0', timerValThree: 0 },
      { timerValOne: 1, timerValTwo: 'f: 0', timerValThree: 1 },
      { timerValOne: 1, timerValTwo: 'f: 1', timerValThree: 1 },
      { timerValOne: 2, timerValTwo: 'f: 1', timerValThree: 1 },
      { timerValOne: 2, timerValTwo: 'f: 1', timerValThree: 2 },
      { timerValOne: 2, timerValTwo: 'f: 2', timerValThree: 2 },
      { timerValOne: 3, timerValTwo: 'f: 2', timerValThree: 2 },
      { timerValOne: 3, timerValTwo: 'f: 2', timerValThree: 3 },
      { timerValOne: 3, timerValTwo: 'f: 3', timerValThree: 3 },
      { timerValOne: 4, timerValTwo: 'f: 3', timerValThree: 3 },
      { timerValOne: 4, timerValTwo: 'f: 3', timerValThree: 4 }
    ];

    subject = combineLatest(
      timerOnecombineLatest$,
      timerTwocombineLatest$,
      timerThreecombineLatest$,
      project()
    );

    testSubscription(subject, position, expected, done);
  });
});

function project(): (
  v1: number,
  v2: number,
  v3: number
) => { timerValOne: number; timerValTwo: number; timerValThree: number } {
  return (timerValOne, timerValTwo, timerValThree) => {
    return {
      timerValOne,
      timerValTwo,
      timerValThree
    };
  };
}
