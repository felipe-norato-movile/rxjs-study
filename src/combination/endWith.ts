import { endWith, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

export const endWithSource$ = of('Hello', 'Friend');

endWithSource$
  // emit on completion
  .pipe(
    endWith('Goodbye', 'Friend'),
    // this function is invoked when unsubscribe methods are called
    finalize(() => console.log('Finally'))
  )
  // 'Hello', 'Friend', 'Goodbye', 'Friend'
  .subscribe(val => console.log(val));
