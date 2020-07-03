import { of, Subject } from 'rxjs';
import { withLatestFrom, zip, map, combineLatest, timeout, mergeMap } from 'rxjs/operators';

// const names$ = of('Ro');
const names$ = new Subject<string>();

// const names$ = of('Ro', 'Becca', 'Fin', 'Rocca');
const ages$ = new Subject<number>();
// const ages$ = of(1, 2, 3);
// const ages$ = of(1, 2, 3);

// .asObservable()

// const stream$ = of(null).pipe(
//   mergeMap(() =>
//     names$.pipe(
//       withLatestFrom(ages$), // if not available and we complete then the stream does not continue, this should suffice for me?
//       map(([name, age]) => `${name}${age}`)
//     )
//   )
// );

// const stream$ = names$.pipe(
//   withLatestFrom(ages$), // if not available and we complete then the stream does not continue, this should suffice for me?
//   map(([name, age]) => `${name}${age}`)
// );

const stream$ = names$.pipe(
  combineLatest(ages$), // if not available and we complete then the stream does not continue, this should suffice for me?
  map(([name, age]) => `${name}${age}`)
);
// ages$.next(42);

stream$.subscribe(
  (name) => console.log('name', name),
  (error) => console.error('*error', error),
  () => console.info('*complete')
);

ages$.next(42);
ages$.next(66);

// names$.next('Ro');
// names$.complete();
setTimeout(() => {
  names$.next('Ro');
  names$.complete();
}, 1000);

console.log('DONE');

// names$.next('Becca');
// setTimeout(() => names$.next('Finn'), 2000);
// names$.next('Finn');
// setTimeout(() => ages$.next(1), 2000);
// setTimeout(() => ages$.next(2), 2000);
// setTimeout(() => ages$.next(3), 3000);

// zip blocks the completion.
// combineLatest also blocks completion.
// withLatestFrom allows completion.

// combineLatest:
// When any observable emits a value, emit the last emitted value from each.
// NOTE: We do not complete until both emit.

// Be aware that combineLatest will not emit an initial value until each observable emits at least one value.

// GH: combineLatest requires all observable emits to call next. Is this question about completing like
// https://github.com/ReactiveX/rxjs/issues/3189
// NOTE: This seems to

// If I use withLatestFrom and then complete then I can use the groupId$ and workflowType$.
// THe sub should complete immidietely.
// withLatestFrom does not wait around for data after a complete event.
// I think it's because withLatestFrom has no power, it's the slave that's checked when the master has a value.
// Whereas zip and combineLatest do emit values when they have an update.
