const TelegramBot = require('node-telegram-bot-api');

const token = '702253135:AAFYKYAY-5mTG-VAeaIRRwmGa8QxRNjXPH8';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (message) => {
  const { id } = message.from;
  const messageText = message.text.toLowerCase();
  if (messageText === 'hi') {
    bot.sendMessage(id, 'Привет, Сидр!');
  }
});
