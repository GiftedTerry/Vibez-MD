const { prefix } = require('../config');
const { reply } = require('../functions');
const { registerCommand } = require("../lib/vibez");

module.exports = {
  name: 'alive',
  description: 'Check if the bot is alive',
  execute(message) {
    if (message.content === `${prefix}alive`) {
      message.react('⚡');
      reply(message, 'Sup boss, Vibez is alive!', 50);
    }
  }
};
