import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

export function testSubscription(
  subject: Observable<any>,
  position: any,
  expected: any,
  done: jest.DoneCallback
) {
  subject.pipe(tap(() => position++)).subscribe({
    next: result => {
      expect(result).toEqual(expected[position - 1]);
      if (position === expected.length) {
        done();
      }
    }
  });
}
