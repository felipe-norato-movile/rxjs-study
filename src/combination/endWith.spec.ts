import { endWithSource$ } from './endWith';
import { Observable, concat } from 'rxjs';
import { testSubscription } from './helper.tests';
import { endWith, finalize } from 'rxjs/operators';

describe('EndWith', () => {
  let subject: Observable<any>;
  let position: number;
  let expected: any;

  beforeEach(() => {
    position = 0;
  });

  it('should ', done => {
    const spy = jest.fn();
    expected = ['Hello', 'Friend', 'Goodbye', 'Friend'];

    subject = endWithSource$.pipe(
      endWith('Goodbye', 'Friend'),
      finalize(() => spy())
    );

    testSubscription(subject, position, expected, done);
    expect(spy).toHaveBeenCalled();
  });
});
