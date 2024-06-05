const fs = require('fs');
setImmediate(() => console.log("timer immediate-1"));

setTimeout(() => {
  console.log('timer-1 finished');
}, 0);

fs.readFile('card.html', () => {
  console.log('I/O finished')
})

console.log("hello from top level")