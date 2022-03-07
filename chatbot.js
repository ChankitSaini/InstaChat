const Insta = require('@androz2091/insta.js');
const client = new Insta.Client();
const chatbot = require("node-fetch").default;

client.on('connected', () => {
    console.log(` My Username Is ${client.user.username}`);
});

client.on('messageCreate', (message) => {
    if (message.author.id === client.user.id) return
    message.markSeen();

    if(message.content.toLowerCase().includes('Who is chankit')) return message.chat.sendMessage("He's is my master.");
    if(message.content.toLowerCase().includes('!repo')) return message.chat.sendMessage('https://github.com/ChankitSaini/InstaChat');
    if(message.content.toLowerCase().includes('!Repo')) return message.chat.sendMessage('https://github.com/ChankitSaini/InstaChat');
    if(message.content.toLowerCase().includes('!ping')) return message.chat.sendMessage('Ah! You woke me up!');

    chatbot(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${process.env.BotName}&ownername=${process.env.OwnerName}`)
    .then(res => res.json())
    .then(json => {
      if(!json.message) return;
      return message.reply(json.message);
    }).catch(err => {});
});

client.login(process.env.username, process.env.password);
