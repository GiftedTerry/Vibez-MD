const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const bot = require(__dirname + '/lib/vibez');
const { VERSION } = require(__dirname + '/config');

const start = async () => {
  try {
    await bot.init();
    bot.logger.info('⏳ Database syncing!');
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
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { results: (result) ? result.rows : null };
    res.render('pages/db', results);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});
