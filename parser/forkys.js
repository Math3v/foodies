const rp = require("request-promise");
const cheerio = require("cheerio");
const options = {
  uri: `http://www.forkys.eu/poledni-menu/poledni-menu-brno/`,
  transform: function(body) {
    return cheerio.load(body);
  }
};

const parse = () =>
  rp(options).then($ => {
    const today = new Date().getDay();
    const food = $(`#day-tab${today}`)
      .find("h2")
      .find("span");
    const soup = food.first().text();
    const main = food.last().text();
    return { soups: [soup], mains: [main] };
  });

module.exports.parse = parse;
