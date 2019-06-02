import { concatData1, concatData2, concatData3 } from './concat';
import { Observable, concat } from 'rxjs';
import { testSubscription } from './helper.tests';

describe('Concat', () => {
  let subject: Observable<any>;
  let position: number;
  let expected: any;

  beforeEach(() => {
    position = 0;
  });

  it('should ', done => {
    expected = [0, 1, 2, 'This', 'Never', 'Runs', 0, 1, 2];
    subject = concat(concatData1, concatData2, concatData3);
    testSubscription(subject, position, expected, done);
  });
});
