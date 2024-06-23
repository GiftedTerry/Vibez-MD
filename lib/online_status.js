export async function sendPresenceUpdate(status, chatId) {
  const presence = {
    "available": "available",
    "unavailable": "unavailable"
  }[status];
  await global.db.updatePresence(chatId, presence);
}
