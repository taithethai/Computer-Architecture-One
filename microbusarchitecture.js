// const fs = require('fs');
// const message = fs.readFileSync('./inputfile', 'utf8');
// console.log(message.split(/\r?\n|\r/)
//   .map(str => str.slice(0, str.indexOf('#')).trim())
//   .filter(item => item !== ''));
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
  console.log(input);
});
