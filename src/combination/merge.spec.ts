import { Observable, merge } from 'rxjs';

import { mapTo } from 'rxjs/operators';

import { testSubscription } from './helper.tests';
import { mergeFirst, mergeSecond, mergeThird, mergeFourth } from './merge';

describe('Merge', () => {
  let subject: Observable<any>;
  let position: number;
  let expected: any;

  beforeEach(() => {
    position = 0;
  });

  it('should ', done => {
    expected = ['FOURTH', 'THIRD', 'SECOND!', 'FOURTH'];

    subject = merge(
      mergeFirst.pipe(mapTo('FIRST!')), // 250ms
      mergeSecond.pipe(mapTo('SECOND!')), // 200ms
      mergeThird.pipe(mapTo('THIRD')), // 150ms
      mergeFourth.pipe(mapTo('FOURTH')) // 100ms
    );

    testSubscription(subject, position, expected, done);
  });
});
