const fs = require('fs');
let eventLoopStep = 0;  // will increase on each next tick
let eventLoopCycle = 1; // we don't have close event here so eventLoopCycle will increase on each setImmediate

// each step is logged by process.nextTick

// nested 0 timeouts
setTimeout(() => {
    console.log('(Timer-Event) timeout');

    // this timeout will be fired in the next cycle
    setTimeout(() => {

        console.log('(Timer-Event) timeout nested');

        // this timeout will be fired in the next cycle
        setTimeout(() => {
            console.log('(Timer-Event) timeout nested 2');
            process.nextTick(() => console.log(`(Next-Tick, Micro-Task) timeout nested 2 next tick, event loop cycle: ${eventLoopCycle}, step: ${++eventLoopStep}`));
            setImmediate(() => {
                console.log('(Immediate-Event)')
                eventLoopCycle++;
                eventLoopStep = 0;
            });
        });

        // this immediate will be fired in the current cycle
        setImmediate(() => {
            console.log('(Immediate-Event) immediate nested 2')
            process.nextTick(() => console.log(`(Next-Tick, Micro-Task) immediate nested 2 next tick, event loop cycle: ${eventLoopCycle}, step: ${++eventLoopStep}`));
            eventLoopCycle++;
            eventLoopStep = 0;
        });

        process.nextTick(() => console.log(`(Next-Tick, Micro-Task) next tick nested 2, event loop cycle: ${eventLoopCycle}, step: ${++eventLoopStep}`));
    });

    process.nextTick(() => console.log(`(Next-Tick, Micro-Task) timeout next tick, event loop cycle: ${eventLoopCycle}, step: ${++eventLoopStep}`));
    // this will be fired in the current cycle on the next step
    Promise.resolve("promise nested").then(val => console.log('(Promise, Micro-Task)', val));

    // this immediate will be fired in the current cycle
    setImmediate(() => {
        process.nextTick(() => console.log(`(Next-Tick, Micro-Task) immediate nested next tick, event loop cycle: ${eventLoopCycle}, step: ${++eventLoopStep}`));
        console.log('(Immediate-Event) immediate nested\n')
        eventLoopCycle++;
        eventLoopStep = 0;
    });
});

// this will be fire after initial next tick
Promise.resolve("promise").then(val => console.log('(Promise, Micro-Task)', val));

// initial next tick
process.nextTick(() => {
    console.log(`(Next-Tick, Micro-Task) next tick, event loop cycle: ${eventLoopCycle}, step: ${++eventLoopStep}`);
});

setImmediate(() => {
    console.log(`(Immediate-Event) immediate\n`);
    process.nextTick(() => console.log(`(Next-Tick, Micro-Task) immediate next tick , event loop cycle: ${eventLoopCycle}, step: ${++eventLoopStep}`));
    eventLoopCycle++;
    eventLoopStep = 0;
});

// main
console.log(`init\n`);

// runs the callback when finishes the reading
fs.readFile('text.txt', 'utf8', function(err, data){
    process.nextTick(() => console.log(`(Next-Tick, Micro-Task) file read next tick, event loop cycle: ${eventLoopCycle}, step: ${++eventLoopStep}`));

    // Display the file content
    console.log('(I/O - Event)', data);

    setImmediate(() => {
        console.log('(Immediate-Event)\n')
        eventLoopCycle++;
        eventLoopStep = 0;
    });
});

// immediately runs the callback
fs.readFile('does_not_exist.txt', 'utf8', function(err, data){
    process.nextTick(() => console.log(`(Next-Tick, Micro-Task) false file read next tick , event loop cycle: ${eventLoopCycle}, step: ${++eventLoopStep}`));

    if(err){
        // Display the error
        console.log('(I/O - Event) file doesn\'t exist');
    }

    setImmediate(() => {
        console.log('(Immediate-Event)\n')
        eventLoopCycle++;
        eventLoopStep = 0;
    });
});