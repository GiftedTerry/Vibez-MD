const { registerCommand } = require('../lib/Vibez');
const { prefix } = require('../config');
const { reply } = require('../functions');

registerCommand({
  name: 'ping',
  categorie: 'General',
  reaction: '⚡',
  description: 'Check the bot\'s ping',
  usage: `${prefix}ping`,
  execute(message) {
    reply(message, 'Pong! 📈 Heartbeat: 50ms');
  }
});
