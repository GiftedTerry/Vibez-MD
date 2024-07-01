const { registerCommand } = require('../lib/vibez');
const { button } = require('../framework/menu_button');
const { prefix } = require('../config');

registerCommand({
  nomCom: "menu",
  categorie: "General"
}, async (dest, zk, commandOptions) => {
  const { ms, respond, authorName, mybotpic } = commandOptions;
  const commands = {};
  const categories = [];

  registerCommand.commandModules.forEach((command) => {
    if (!commands[command.categorie]) {
      commands[command.categorie] = [];
      categories.push(command.categorie);
    }
    commands[command.categorie].push(command.nomCom);
  });

  categories.sort();
  Object.keys(commands).forEach((categorie) => {
    commands[categorie].sort();
  });

  let menuMsg = `Sup boss \n\n`;
  let infoMsg = `**BOT INFORMATION** 
________________________
|😎😎😎😎😎😎😎😎😎😎😎
|😎<<<<<<<<<<<<<<<<<<<<<
|😎| *Prefix* : ${prefix} 
|😎| *Owner* : ${authorName} 
|😎| *Mode* : ${process.env.NODE_ENV} 
|😎| *Commands* : ${registerCommand.commandModules.length} 
|😎| *Date* : ${new Date().toLocaleDateString()} 
|😎| *Time* : ${new Date().toLocaleTimeString()} 
|😎| *Memory* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())} 
|😎| *Platform* : ${os.platform()} 
|😎| *Developer* : PRO TECH 
|😎>>>>>>>>>>>>>>>>>>>> 
|😎😎😎😎vibez😎😎😎😎😎 \n\n`;
------------------------

  menuMsg += infoMsg;

  categories.forEach((categorie) => {
    menuMsg += `_______________ |`;
    for (let i = 0; i < 5; i++) {
      menuMsg += `😎`;
    }
    menuMsg += `|😎| <<<<<<<<<< |😎|`;
    menuMsg += ` |😎|`;
    menuMsg += ` ${categorie} |😎>>>>>>>>>> |`;
    for (let i = 0; i < 5; i++) {
      menuMsg += `😎`;
    }
    menuMsg += `--------------------------\n`;
    menuMsg += `|                      |\n`;
    commands[categorie].forEach((command) => {
      menuMsg += `|  • ${command}      |\n`;
    });
    menuMsg += `|                      |\n`;
    menuMsg += `______________________\n`;
    });
    menuMsg += `______________________\n`;
    menuMsg += `| |\n`;
    menuMsg += `| ${button.text} |`;
    menuMsg += `| |\n`;
    menuMsg += `______________________\n`;

    respond(menuMsg, {
      buttons: [button]
  });

  const link = mybotpic();
  if (link.match(/\.(mp4|gif)$/i)) {
    try {
      zk.sendMessage(dest, { video: { url: link }, caption: menuMsg, footer: "I am Vibez-MD, my creator is PRO TECH", gifPlayback: true }, { quoted: ms });
    } catch (e) {
      console.log("Menu error: " + e);
      respond("Menu error: " + e);
    }
  } else if (link.match(/\.(jpeg|png|jpg)$/i)) {
    try {
      zk.sendMessage(dest, { image: { url: link }, caption: menuMsg, footer: "I am Vibez-MD, developed by Terry" }, { quoted: ms });
    } catch (e) {
      console.log("Menu error: " + e);
      respond("Menu error: " + e);
    }
  } else {
    respond(menuMsg);
  }
});
