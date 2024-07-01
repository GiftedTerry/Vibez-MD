const { registerCommand } = require('../lib/vibez');
const pm2 = require('pm2');
const { prefix } = require('../config');
const { reply } = require('../function');

registerCommand(
  {
    name: 'off',
    categorie: 'developer',
    reaction: '💻',
    description: 'Shut down the bot and all files. Only usable by the developers.',
  },
  async (message) => {
    if (message.content.startsWith(prefix + 'off') && (message.sender === '2349122128803' || message.sender === '2347039853320')) {
      console.log('Shutting down bot...');
      pm2.stop('Vibez-MD', (err, proc) => {
        if (err) {
          console.error(err);
          reply(message, 'Error shutting down bot', 50);
        } else {
          console.log(`Bot stopped successfully`);
          reply(message, 'Bot stopped successfully', 50);
        }
      });
    } else {
      reply(message, 'You are not authorized to use this command.', 50);
    }
  }
);
