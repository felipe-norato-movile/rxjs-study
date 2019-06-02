import { interval, Observable, race } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';
import { testSubscription } from './helper.tests';

describe('Pairwise', () => {
  let subject: Observable<any>;
  let position: number;
  let expected: any;

  beforeEach(() => {
    position = 0;
  });

  it('should receives the first complete value', done => {
    expected = ['1s won!'];

    subject = race(
      interval(150),
      interval(100).pipe(
        mapTo('1s won!'),
        take(1)
      ),
      interval(200),
      interval(250)
    );

    testSubscription(subject, position, expected, done);
  });
});
