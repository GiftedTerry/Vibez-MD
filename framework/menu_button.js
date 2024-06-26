module.exports = {
  button: {
    text: "Menu",
    url: {
      "View Channel": "https://whatsapp.com/channel/0029VaiVmtX4Y9lpUssihA1x",
      "View Group": "https://chat.whatsapp.com/I2Lad1yJIOA4QwWnxyszAZ"
    },
    click: async (zk, dest) => {
      zk.sendMessage(dest, {
        text: "Menu",
        buttons: [
          {
            text: "View Channel",
            url: "https://whatsapp.com/channel/0029VaiVmtX4Y9lpUssihA1x"
          },
          {
            text: "View Group",
            url: "https://chat.whatsapp.com/I2Lad1yJIOA4QwWnxyszAZ"
          }
        ]
      });
    }
  }
};

