// RxJS v6+
import { pairwise, take, tap } from 'rxjs/operators';
import { interval } from 'rxjs';

//Returns: [0,1], [1,2], [2,3], [3,4], [4,5]
interval(1000).pipe(
  // tap(it => console.log('Tap: : ', it)),
  pairwise(),
  take(5)
);
// .subscribe(console.log);
