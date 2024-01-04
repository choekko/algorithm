const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [trainCount, commandCount] = input[0].split(' ').map(Number);
const commands = [];

for (let i = 1; i <= commandCount; i++) {
  const [commandNumber, trainNumber, seatNumber] = input[i].split(' ').map(Number);
  commands.push({ commandNumber, trainNumber: trainNumber - 1, seatNumber: seatNumber - 1 });
}

const solution = (commands, trainCount) => {
  const trains = Array.from({ length: trainCount }, () => '0'.repeat(20));

  const isTherePerson = ({ trainNumber, seatNumber }) => {
    return trains[trainNumber][seatNumber] === '1';
  }

  const command1 = ({ trainNumber, seatNumber }) => {
    if (isTherePerson({ trainNumber, seatNumber })) {
      return;
    }

    const newTrain = [...trains[trainNumber]];
    newTrain[seatNumber] = '1';

    trains[trainNumber] = newTrain.join('');
  }

  const command2 = ({ trainNumber, seatNumber }) => {
    if (!isTherePerson({ trainNumber, seatNumber })) {
      return;
    }

    const newTrain = [...trains[trainNumber]];
    newTrain[seatNumber] = '0';

    trains[trainNumber] = newTrain.join('');
  }

  const command3 = ({ trainNumber }) => {
    const newTrain = [...trains[trainNumber]];
    newTrain.pop();
    newTrain.unshift('0');

    trains[trainNumber] = newTrain.join('');
  }

  const command4 = ({ trainNumber }) => {
    const newTrain = [...trains[trainNumber]];
    newTrain.shift();
    newTrain.push('0');

    trains[trainNumber] = newTrain.join('');
  }

  const commandMap = {
    command1,
    command2,
    command3,
    command4
  }

  commands.forEach(command => {
    commandMap[`command${command.commandNumber}`]({ ...command })
  })

  const getCount = () => {
    const history = {};
    let count = 0;

    for (const train of trains) {
      if (history[train]) continue;

      history[train] = true;
      count++;
    }

    return count;
  }

  return getCount();
}

console.log(solution(commands, trainCount))