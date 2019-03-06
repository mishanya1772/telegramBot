const TelegramBot = require('node-telegram-bot-api');
const api = require('../testData/api');
const interfaceElements = require('../testData/interface');
const commands = new (require('../pageObjects/commands'))();

const token = '702253135:AAFYKYAY-5mTG-VAeaIRRwmGa8QxRNjXPH8';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello', {
    reply_markup: {
      keyboard: interfaceElements.keyboard,
    },
  });
});

bot.on('message', (message) => {
  const { id } = message.from;
  const messageText = message.text.toLowerCase();

  if (messageText === 'hi') {
    bot.sendMessage(id, interfaceElements.menu);
  } else if (messageText === 'money') {
    commands.getCurrency(id, bot);
  } else if (messageText === 'weather in kiev') {
    commands.getWeather(id, bot, api.weatherInKiev);
  } else if (messageText === 'weather in izmail') {
    commands.getWeather(id, bot, api.weatherInIzmail);
  } else if (messageText === 'chuck norris') {
    commands.getChuckNorrisStory(id, bot);
  }
});
