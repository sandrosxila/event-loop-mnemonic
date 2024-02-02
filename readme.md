# Node.js Event Loop Mnemonic

You don't need to read thousands of articles about the event loop. If you ever forget how event loop works, run this example and you will see the order of events.

## Illustration of the process

![event_loop_animation](https://github.com/sandrosxila/event-loop-mnemonic/assets/13416127/6e9547da-09c3-456b-801b-d51a67979204)

[Source](https://medium.com/@saravanaeswari22/microtasks-and-macro-tasks-in-event-loop-7b408b2949e0)

![Screenshot from 2024-02-02 15-19-05](https://github.com/sandrosxila/event-loop-mnemonic/assets/13416127/f3e59db6-6e0f-49e1-864b-ea8f04872366)

[Source](https://blog.insiderattack.net/promises-next-ticks-and-immediates-nodejs-event-loop-part-3-9226cbe7a6aa)

## How to run the example?

just clone the repo:

```bash
git clone https://github.com/sandrosxila/event-loop-mnemonic/
```

and run the code:

```bash
npm start
```

## output

```
init

(Next-Tick, Micro-Task) next tick, event loop cycle: 1, step: 1
(Promise, Micro-Task) promise
(Timer-Event) timeout
(Next-Tick, Micro-Task) timeout next tick, event loop cycle: 1, step: 2
(Promise, Micro-Task) promise nested
(I/O - Event) file doesn't exist
(Next-Tick, Micro-Task) false file read next tick , event loop cycle: 1, step: 3
(Immediate-Event) immediate

(Next-Tick, Micro-Task) immediate next tick , event loop cycle: 2, step: 1
(Immediate-Event) immediate nested

(Next-Tick, Micro-Task) immediate nested next tick, event loop cycle: 3, step: 1
(Immediate-Event)

(Timer-Event) timeout nested
(Next-Tick, Micro-Task) next tick nested 2, event loop cycle: 4, step: 1
(Immediate-Event) immediate nested 2
(Next-Tick, Micro-Task) immediate nested 2 next tick, event loop cycle: 5, step: 1
(I/O - Event) Text from the file: text.txt
(Next-Tick, Micro-Task) file read next tick, event loop cycle: 5, step: 2
(Immediate-Event)

(Timer-Event) timeout nested 2
(Next-Tick, Micro-Task) timeout nested 2 next tick, event loop cycle: 6, step: 1
(Immediate-Event)
```
