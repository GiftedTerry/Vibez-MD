const { registerCommand } = require('../lib/vibez');
const { prefix } = require('../config');
const modes = {
  easy: {
    range: [-3, 3],
    ops: ['+', '-'],
    time: 30000,
    bonus: 10
  },
  medium: {
    range: [-10, 10],
    ops: ['*', '/', '+', '-'],
    time: 40000,
    bonus: 40
  },
  hard: {
    range: [-40, 40],
    ops: ['*', '/', '+', '-'],
    time: 60000,
    bonus: 150
  }
};

const operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
};

function randomInt(from, to) {
  if (from > to) [from, to] = [to, from];
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function genMath(mode) {
  const { range, ops, time, bonus } = modes[mode];
  const a = randomInt(...range);
  const b = randomInt(...range);
  const op = pickRandom(ops);
  let result;
  if (op === '/') {
    [a, b] = [b, a]; // swap a and b for division
  }
  try {
    result = eval(`${a} ${op} ${b}`);
  } catch (error) {
    console.error(`Error evaluating expression: ${error}`);
    return null;
  }
  return {
    soal: `${a} ${operators[op]} ${b}`,
    mode,
    waktu: time,
    hadiah: bonus,
    jawaban: result
  };
}

registerCommand({
  name: 'math',
  description: 'Generate a random math problem',
  usage: `${prefix}math [level]`,
  example: `${prefix}math easy`,
  category: 'fun',
  execute: async (message, args) => {
    const level = args[0] ? args[0].toLowerCase() : null;
    if (!level) {
      return message.reply('Choose a level between `easy`, `medium`, `hard`');
    }
    const mode = modes[level];
    if (!mode) {
      return message.reply('Invalid level');
    }
    const mathProblem = await genMath(mode);
    const question = mathProblem.soal;
    const answer = mathProblem.jawaban;
    message.reply(`You have 30 seconds to solve this problem: ${question}`);
    const collector = message.channel.createMessageCollector({ time: 30000 });
    collector.on('collect', (msg) => {
      if (msg.author.bot) return;
      const userAnswer = msg.content.trim();
      if (userAnswer === answer) {
        message.reply('Correct!');
        collector.stop();
      } else {
        message.reply(`Not correct. The answer is ${answer}`);
        collector.stop();
      }
    });
    collector.on('end', () => {
      if (collectorReason === 'time') {
        message.reply(`Time has elapsed. The answer is ${answer}`);
        message.reply(`The correct answer is ${answer}`);
      }
    });
  },
});
