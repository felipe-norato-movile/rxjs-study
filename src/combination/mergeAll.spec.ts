import { mergeAllSource1, mergeAllSource2, mergeAllSource3 } from './mergeAll';
import { Observable } from 'rxjs';
import { map, mergeAll, mergeMap, tap } from 'rxjs/operators';
import { testSubscription } from './helper.tests';

describe('MergeAll', () => {
  let subject: Observable<any>;
  let position: number;
  let expected: any;

  beforeEach(() => {
    position = 0;
  });

  it('should return using mergeAll', done => {
    expected = [
      'source1: 0, source2: 0',
      'source1: 0, source2: 1',
      'source1: 1, source2: 0',
      'source1: 1, source2: 1'
    ];

    subject = mergeAllSource1.pipe(
      map(val => mergeAllSource2.pipe(map(it => [val, it].join(', ')))),
      mergeAll()
    );

    testSubscription(subject, position, expected, done);
  });

  it('should return using mergeAll two wises', done => {
    expected = [
      'source1: 0, source2: 0, source3: 0',
      'source1: 0, source2: 0, source3: 1',
      'source1: 0, source2: 1, source3: 0',
      'source1: 1, source2: 0, source3: 0',
      'source1: 0, source2: 1, source3: 1',
      'source1: 1, source2: 0, source3: 1',
      'source1: 1, source2: 1, source3: 0',
      'source1: 1, source2: 1, source3: 1'
    ];

    subject = mergeAllSource1.pipe(
      map(val => mergeAllSource2.pipe(map(it => [val, it].join(', ')))),
      mergeAll(),
      map(val => mergeAllSource3.pipe(map(it => [val, it].join(', ')))),
      mergeAll()
    );

    testSubscription(subject, position, expected, done);
  });

  it('should return using mergeMap ', done => {
    expected = [
      'source1: 0, source2: 0',
      'source1: 0, source2: 1',
      'source1: 1, source2: 0',
      'source1: 1, source2: 1'
    ];

    subject = mergeAllSource1.pipe(
      mergeMap(val => mergeAllSource2.pipe(map(it => [val, it].join(', '))))
    );

    testSubscription(subject, position, expected, done);
  });

  it('should return using mergeMap two wises', done => {
    expected = [
      'source1: 0, source2: 0, source3: 0',
      'source1: 0, source2: 0, source3: 1',
      'source1: 0, source2: 1, source3: 0',
      'source1: 1, source2: 0, source3: 0',
      'source1: 0, source2: 1, source3: 1',
      'source1: 1, source2: 0, source3: 1',
      'source1: 1, source2: 1, source3: 0',
      'source1: 1, source2: 1, source3: 1'
    ];

    subject = mergeAllSource1.pipe(
      mergeMap(val => mergeAllSource2.pipe(map(it => [val, it].join(', ')))),
      mergeMap(val => mergeAllSource3.pipe(map(it => [val, it].join(', '))))
    );

    testSubscription(subject, position, expected, done);
  });
});
