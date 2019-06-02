import { combineLatest, timer } from 'rxjs';
import { take, tap } from 'rxjs/operators';

// timerOne emits first value at 1s, then once every 4s
const timerOne$ = timer(1000, 4000).pipe(take(5));
// timerTwo emits first value at 2s, then once every 4s
const timerTwo$ = timer(2000, 4000).pipe(take(5));
// timerThree emits first value at 3s, then once every 4s
const timerThree$ = timer(3000, 4000).pipe(take(5));

combineLatest(timerOne$, timerTwo$, timerThree$, projectionFunction())
  .pipe(tap(it => console.log('Tap: : ', it)))
  .subscribe();

function projectionFunction(): (
  v1: number,
  v2: number,
  v3: number
) => { timerValOne: number; timerValTwo: number; timerValThree: number } {
  return (timerValOne, timerValTwo, timerValThree) => {
    return {
      timerValOne,
      timerValTwo,
      timerValThree
    };
  };
}
