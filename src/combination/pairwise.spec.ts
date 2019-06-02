import { interval, Observable } from 'rxjs';
import { pairwise, take } from 'rxjs/operators';
import { testSubscription } from './helper.tests';

describe('forkJoin', () => {
  let subject: Observable<any>;
  let position: number;
  let expected: any;

  beforeEach(() => {
    position = 0;
  });

  it('should the past and current value as an array', done => {
    expected = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]];

    subject = interval(100).pipe(
      pairwise(),
      take(5)
    );

    testSubscription(subject, position, expected, done);
  });
});
