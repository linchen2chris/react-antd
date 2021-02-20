const rxjs = require('rxjs');

const {timer, combineLatest}  = rxjs;
const observable = rxjs.Observable
// 通过create方法创建一个Observable
// 回调函数会接受observer参数，也就是观察者角色
      .create(observer => {
				observer.next(1);
				observer.next(2);
				observer.next(3);
				setTimeout(() => {
          observer.next(4);
          observer.complete();
				}, 1000);
			});
console.log('just before subscribe');
// Observe观察者
// Observer 是一个对象，这个对象具有三个方法，分别是 next, error, complete
// 要使用观察者，需要把它提供给 Observable 的 subscribe 方法
const logobserve = {
  next: x => console.log('got value ' + x),
  error: err => console.error('something wrong occurred: ' + err),
  complete: () => console.log('done'),
};

const clickObserve = {
	next: x => console.log("Line 27", x),
	error: err => console.error("Line 28", err),
	complete: () => console.log("Line 29complete"),
};
// 订阅bservable
// 只有在订阅之后，才会在流Observable变化的时候，调用observer提供的方法，并通知他
//observable.subscribe(logobserve);
console.log('just after subscribe');

// rxjs.timer(1000, 2000).subscribe(console.log);

const timerOne$ = timer(1000, 4000);
// timerTwo emits first value at 2s, then once every 4s
const timerTwo$ = timer(2000, 4000);
// timerThree emits first value at 3s, then once every 4s
const timerThree$ = timer(3000, 4000);

combineLatest(
  timerOne$,
  timerTwo$,
  timerThree$,
  // combineLatest also takes an optional projection function
  (one, two, three) => {
    return `Timer One (Proj) Latest: ${one}, 
              Timer Two (Proj) Latest: ${two}, 
              Timer Three (Proj) Latest: ${three}`;
  }
).subscribe(console.log);
// when one timer emits, emit the latest values from each timer as an array
// combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(
//   ([timerValOne, timerValTwo, timerValThree]) => {
//     /*
//       Example:
// 			timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
// 			timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
// 			timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
// 		*/
//     console.log(
//       `Timer One Latest: ${timerValOne},
//      Timer Two Latest: ${timerValTwo},
//      Timer Three Latest: ${timerValThree}`
//     );
//   });
// 
// observable.subscribe(clickObserve);
// 
// const sub = new rxjs.Subject();
// 
// sub.subscribe(logobserve);
// sub.next('22222222222222222222222');
// sub.complete();

