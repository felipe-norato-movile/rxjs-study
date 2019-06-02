import { forkJoin, Observable } from 'rxjs';
import {
  forkJoinData1$,
  forkJoinData2$,
  forkJoinData3$,
  forkJoinData4$
} from './forkJoin';
import { testSubscription } from './helper.tests';

describe('EndWith', () => {
  let subject: Observable<any>;
  let position: number;
  let expected: any;

  beforeEach(() => {
    position = 0;
  });

  it('should ', done => {
    expected = [
      ['Hello', 'World', 'interval1: interval1 not started', 'interval2: 0']
    ];

    subject = forkJoin(
      forkJoinData1$,
      forkJoinData2$,
      forkJoinData3$,
      forkJoinData4$
    );

    testSubscription(subject, position, expected, done);
  });
});
