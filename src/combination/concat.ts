import { interval, of, concat } from 'rxjs';
import { take } from 'rxjs/operators';

const data = interval(1000).pipe(take(3));
const data2 = interval(1000).pipe(take(3));

concat(data, of('This', 'Never', 'Runs'), data2)
  // log: 1,2,3,4.....
  .subscribe(console.log);
