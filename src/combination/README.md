# Combination Operators

## combineAll

When **source completes** emits value
At subscription it acts as an **combineLatest**

```ts
source1.pipe(
  map(() => source2),
  combineAll()
);
```

## combineLatest (most used)

When any observable emits a value, emit the latest value from each.
Only starts when **all observables emits an value**, we can add an _startWith_ to trigger initially

```ts
combineLatest(sourceOne, sourceTwo, sourceThree, sourceFour);
```

## concat (most used)

Subscribe to observables in **order** as previous completes

```ts
concat(data, of('This', 'Never', 'Runs'), data2);
```

## concatAll

Collect observables and subscribe to next when previous completes.
The observer emits value when **previeus completes**

```ts
of(obs1, obs2, obs3).pipe(concatAll());
```

## endWith

Emit given value(s) on completion.

```ts
source$.pipe(endWith('Goodbye', 'Friend'));
```

## forkJoin

When **all observables complete**, emit the last emitted value from each.

```ts
forkJoin(sourceOne, sourceTwo, sourceThree, sourceFour);
```

## merge (most used)

Turn multiple observables into a **single observable**.

```ts
// merge Solution
merge(source1, source2);
```

## mergeAll

Collect and subscribe to all observables

```ts
// mergeAll Solution
source1.pipe(
  map(val => source2),
  mergeAll()
);
```

```ts
// mergeMap Solution
source1.pipe(mergeMap(val => source2));
```

```ts
// merge Solution
merge(source1, source2);
```

## pairwise

Emit the previous and current values as an array.

```ts
source.pipe(pairwise());
```

## race

The observable to **emit first** is used.

```ts
race(source1, source2);
```

## startWith (most used)

Emit given **value first**.

```ts
source.pipe(startWith(val));
```

## withLatestFrom (most used)

Also provide the last value from another observable.

```ts
source1.pipe(withLatestFrom(source2), map(([first, second]) => {});
```

## zip

**After all** observables emit, emit values as an **array**

```ts
zip(sourceOne, sourceTwo, sourceThree, sourceFour);
```
