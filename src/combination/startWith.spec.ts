import { Observable, timer } from 'rxjs';
import { startWith, take } from 'rxjs/operators';
import { testSubscription } from './helper.tests';

describe('StartWith', () => {
  let subject: Observable<any>;
  let position: number;
  let expected: any;

  beforeEach(() => {
    position = 0;
  });

  it('should receives startWith value first', done => {
    expected = ['initial value', 0, 1, 2, 3];

    subject = timer(200, 300).pipe(
      take(4),
      startWith('initial value')
    );

    testSubscription(subject, position, expected, done);
  });
});
