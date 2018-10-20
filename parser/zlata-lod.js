const rp = require("request-promise");
const cheerio = require("cheerio");
const options = {
  uri: `http://www.zlatalod.com/denni-menu`,
  transform: function(body) {
    return cheerio.load(body);
  }
};

const parse = () =>
  rp(options).then($ => {
    const soups = $("menu")
      .first()
      .find("p")
      .slice(1, 3)
      .map((_i, e) => e.next.data)
      .get();
    const mains = $("menu")
      .first()
      .find("ol li")
      .map((_i, e) => $(e).text())
      .get()
      .map(main => main.slice(0, -1));
    console.log(soups);
    console.log(mains);
    return { soups, mains };
  });

module.exports.parse = parse;
