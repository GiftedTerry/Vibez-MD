const db = require('./database');
const bot = require(__dirname + '../lib/vibez');
const { VERSION } = require(__dirname + '/config');

bot.on('message', (msg) => {
  const name = msg.author.name;
  const number = msg.author.phone;
  const message = msg.body;
  db.run('INSERT INTO users (name, phone) VALUES (?, ?)', [name, number], (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`User added successfully! ${name} (${number})`);
    }
  });
});

const start = async () => {
  try {
    await bot.init();
    bot.logger.info('Database syncing!');
    await bot.DATABASE.sync();
    await bot.connect();
  } catch (error) {
    console.error(error);
    start();
  }
};

start();

app.get('/db', async (req, res) => {
  try {
    const results = await db.all('SELECT * FROM users');
    res.render('pages/db', { results });
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
