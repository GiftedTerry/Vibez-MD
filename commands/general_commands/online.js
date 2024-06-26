import { sendPresenceUpdate } from '../lib/online_status';
import { registerCommand } from '../lib/vibez';

export async function online(m) {
  const prefix = global.config.prefix;
  const args = m.text.split(' ');
  if (m.text.startsWith(prefix) && args[1] === 'online') {
    if (args[2] === 'on') {
      await sendPresenceUpdate('available', m.chat);
    } else if (args[2] === 'off') {
      await sendPresenceUpdate('unavailable', m.chat);
    }
  }
}

registerCommand({
  name: 'online',
  categorie: 'General',
  reaction: '👁️',
}, {
  execute: online,
});
