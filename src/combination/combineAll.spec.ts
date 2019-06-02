import { Observable, combineLatest } from 'rxjs';
import { combineAll, map, tap } from 'rxjs/operators';
import { source1combineAll, source2combineAll } from './combineAll';

describe('CombineAll', () => {
  let subject: Observable<any>;
  let expected: any;
  let position: number;

  beforeEach(() => {
    position = 0;
  });

  it('should an Array of results after source completes', done => {
    expected = [
      ['Result (0): 0', 'Result (1): 0', 'Result (2): 0'],
      ['Result (0): 1', 'Result (1): 0', 'Result (2): 0'],
      ['Result (0): 1', 'Result (1): 1', 'Result (2): 0'],
      ['Result (0): 1', 'Result (1): 1', 'Result (2): 1']
    ];
    subject = source1combineAll.pipe(
      map(val => source2combineAll.pipe(map(i => `Result (${val}): ${i}`))),
      combineAll()
    );

    subject.pipe(tap(() => position++)).subscribe({
      next: result => {
        expect(result).toEqual(expected[position - 1]);
        if (position === expected.length) {
          done();
        }
      }
    });
  });

  it('when only source2 returns a value', done => {
    expected = [
      ['source2: 0', 'source2: 0', 'source2: 0'],
      ['source2: 1', 'source2: 0', 'source2: 0'],
      ['source2: 1', 'source2: 1', 'source2: 0'],
      ['source2: 1', 'source2: 1', 'source2: 1']
    ];

    const source1 = source1combineAll.pipe(map(i => `source1: ${i}`));
    const source2 = source2combineAll.pipe(map(i => `source2: ${i}`));
    subject = source1.pipe(
      map(() => source2),
      combineAll()
    );

    subject.pipe(tap(() => position++)).subscribe({
      next: result => {
        expect(result).toEqual(expected[position - 1]);
        if (position === expected.length) {
          done();
        }
      }
    });
  });

  it('should have different value from combineLatest', done => {
    expected = [
      ['source1: 0', 'source2: 0'],
      ['source1: 0', 'source2: 1'],
      ['source1: 1', 'source2: 1'],
      ['source1: 2', 'source2: 1']
    ];

    subject = combineLatest(
      source1combineAll.pipe(map(i => `source1: ${i}`)),
      source2combineAll.pipe(map(i => `source2: ${i}`))
    );

    subject.pipe(tap(() => position++)).subscribe({
      next: result => {
        expect(result).toEqual(expected[position - 1]);
        if (position === expected.length) {
          done();
        }
      }
    });
  });
});
