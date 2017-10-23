// const fs = require('fs');
// const message = fs.readFileSync('./inputfile', 'utf8');
// console.log(message.split(/\r?\n|\r/)
//   .map(str => str.slice(0, str.indexOf('#')).trim())
//   .filter(item => item !== ''));
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
  doThis(input);
});

function doThis(x) {
  const order = (x.split(/\r?\n|\r/)
    .map(str => str.slice(0, str.indexOf('#') === -1 ? str.length: str.indexOf('#')).trim())
    .filter(item => item !== '')
    .map(num => Number(`0b${num}`)));
  let register = [0, 0, 0, 0];
  let active;
  while (order.length) {
    switch (order.shift()) {
      case 1: // clear register
        register = [0, 0, 0, 0];
        break;
      case 2: // set active
        active = order.shift();
        break;
      case 4: // save to active
        register[active] = order.shift();
        break;
      case 5:
        register[active] = register[order.shift()] * register[order.shift()];
        break;
      case 6:
        console.log(register[active]);
        break;
      default:
        console.log('oops');
    }
  }
}
