/*
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
        register = [];
        break;
      case 2: // set active
        active = order.shift();
        break;
      case 4: // save to active
        register[active] = order.shift();
        break;
      case 5: // mul
        register[active] = register[order.shift()] * register[order.shift()];
        break;
      case 6: // print
        console.log(register[active]);
        break;
      default:
        console.log('oops');
    }
  }
}
*/

process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
  if (text === 'quit\n') {
    done();
  }
  if(text.indexOf('\n')) {
    const lines = text.split('\n');
    lines.forEach((line) => {
      // prep variable
      const inputBinary = line.split('#')[0].trim();
      const inputDecimal = Number('0b' + inputBinary);
      //console.log('decimal' + inputDecimal);
      //console.log('binary' + inputBinary);
      if(!isNaN(inputDecimal)) {
        cpu.process(inputDecimal);
      }
    });
  }  
});
const cpu = { 
  arr    : [],
  multArr: [],
  active : undefined,
  save   : false,
  mult   : false,
  set    : false,
};

cpu.process = (num) => {
  if (cpu.save) {
    cpu.save = false;
    cpu.arr[cpu.active] = num;
  }
  else if (cpu.set) {
    cpu.set = false;
    cpu.active = num;
  }
  else if (cpu.mult) {
    if (cpu.multArr.length === 1) {
      cpu.multArr.push(cpu.arr[num]);
      cpu.arr[cpu.active] = cpu.multArr.pop() * cpu.multArr.pop();
      cpu.mult = false;
    }
  } else {
    switch (num) {
      case 1:
        cpu.arr = [];
        cpu.multArr = [];
        cpu.active = undefined;
        cpu.save = false;
        cpu.mult = false;
        cpu.set = false;
        break;
      case 2:
        cpu.set = true;
        break;
      case 4:
        cpu.save = true;
        break;
      case 5:
        cpu.mult = true;
        break;
      case 6:
        console.log(cpu.arr[cpu.active]);
        break;
      default:
        console.log('oops');
    }
  }


};
function done() {
  process.exit();
}

