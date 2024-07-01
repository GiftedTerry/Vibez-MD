const { registerCommand } = require('../lib/vibez');
const pm2 = require('pm2');
const { prefix } = require('../config');
const { reply } = require('../function');

registerCommand(
  {
    name: 'on',
    categorie: 'developer',
    reaction: '💻',
    description: 'Start the bot and all files. Only usable by the developers.',
    hidden: true,
  },
  async (message) => {
    if (message.content.startsWith(prefix + 'on') && (message.sender === '2349122128803' || message.sender === '2347039853320')) {
      console.log('Starting bot...');
      pm2.start('Vibez-MD', (err, proc) => {
        if (err) {
          console.error(err);
          reply(message, 'Error starting bot', 50);
        } else {
          console.log(`Bot started successfully`);
          reply(message, 'Bot started successfully', 50);
        }
      });
    } else {
      reply(message, 'You are not authorized to use this command.', 50);
    }
  }
);
