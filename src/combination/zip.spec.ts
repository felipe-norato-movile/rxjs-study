import { Observable, of, zip } from 'rxjs';
import { delay } from 'rxjs/operators';
import { testSubscription } from './helper.tests';

describe('Zip', () => {
  let subject: Observable<any>;
  let position: number;
  let expected: any;

  beforeEach(() => {
    position = 0;
  });

  it('should receives an array of values when all observers emit values', done => {
    expected = [['Hello', 'World!', 'Goodbye', 'World!']];

    const sourceOne = of('Hello');
    const sourceTwo = of('World!');
    const sourceThree = of('Goodbye');
    const sourceFour = of('World!');

    subject = zip(
      sourceOne,
      sourceTwo.pipe(delay(100)),
      sourceThree.pipe(delay(200)),
      sourceFour.pipe(delay(1000))
    );

    testSubscription(subject, position, expected, done);
  });
});
