// RxJS v6+
import { timer } from 'rxjs';
import { startWith, take } from 'rxjs/operators';

//emit values in sequence every 3s
const source = timer(2000, 3000).pipe(take(4));
//start with -3, -2, -1
const example = source.pipe(startWith(-3, -2, -1));
//output: -3, -2, -1, 0, 1, 2....
const subscribe = example.subscribe(val => console.log(val));
