const fs = require('fs-extra');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const { prefix } = require('../config');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const commands = [];
let commandModules = [];

function registerCommand(obj, functions) {
  const commandInfo = { ...obj };
  commandInfo.categorie = commandInfo.categorie || "General";
  commandInfo.reaction = commandInfo.reaction || "😎";
  commandInfo.usage = `${prefix}${commandInfo.name}`;
  commandInfo.functions = functions;
  commandModules.push(commandInfo);
  commands.push(commandInfo.name);
  return commandInfo;
}

module.exports = {
  registerCommand,
  commands,
  commandModules,
  pool,
};
