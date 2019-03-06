const request = require('request');
const api = require('../testData/api');

class mainCommands {
  getWeather(id, bot, apiWeather) {
    request(apiWeather, (error, response, body) => {
      const weather = JSON.parse(body);

      bot.sendMessage(id, `Weather: ${weather.currently.summary}\nTemperature: ${((weather.currently.temperature - 32) * 0.625).toFixed(2)} °С\nCloud coverage: ${weather.currently.cloudCover} ☁\nWind speed: ${weather.currently.windSpeed} kph ➚`);
    });
  }

  getCurrency(id, bot) {
    let goodWishes = 'Nishebrod, Have a good day!\n';

    request(api.currency, (error, response, body) => {
      const data = JSON.parse(body);

      data.forEach((value) => {
        goodWishes += `Currency: ${value.ccy} | Buy: ${value.buy} | Sale: ${value.sale}\n`;
      });
      bot.sendMessage(id, goodWishes);
    });
  }

  getChuckNorrisStory(id, bot) {
    request(api.chuckNorris, (error, response, body) => {
      const story = JSON.parse(body);

      bot.sendMessage(id, `${story.value.joke}`);
    });
  }
}

module.exports = mainCommands;
