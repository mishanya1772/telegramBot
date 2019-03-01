const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');

const token = '702253135:AAFYKYAY-5mTG-VAeaIRRwmGa8QxRNjXPH8';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (message) => {
  const { id } = message.from;
  const messageText = message.text.toLowerCase();
  if (messageText === 'hi') {
    bot.sendMessage(id, 'Hi, my Lord!\nI can give u such information as: \n  ► money ◄ \n  ► weather ◄');
  } else if (messageText === 'money') {
    request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', (error, response, body) => {
      const data = JSON.parse(body);
      data.forEach((value) => {
        bot.sendMessage(id, `Currency: ${value.ccy} | Buy: ${value.buy} | Sale: ${value.sale}`);
      });
    });
    bot.sendMessage(id, 'Nishebrod, Have a good day!');
  } else if (messageText === 'weather') {
    request('https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22', (error, response, body) => {
      const gg = JSON.parse(body);
      bot.sendMessage(id, `Weather: ${gg.coord.lon}`);
    });
  } else bot.sendMessage(id, 'I don\'t understand u this command:(');
});
