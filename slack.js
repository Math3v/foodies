const forkysParser = require("./parser/forkys").parse;

function menuToText({ soups, mains }) {
  return `*Soups*:${soups.join(", ")}\n*Mains:*${mains.join(", ")}`;
}

function getParser(command) {
  if (command === "forkys") {
    return forkysParser;
  } else {
    return undefined;
  }
}

async function commandHandler({ command }) {
  const parser = getParser(command);
  if (!parser) {
    return { text: "Not Supported" };
  }

  try {
    const menu = await parser();
    return { text: menuToText(menu) };
  } catch (error) {
    return { text: `Error: ${error}` };
  }
}

async function allHandler() {
  try {
    const restaurants = [{ name: "Forkys", command: "forkys" }];
    const menus = await Promise.all(restaurants.map(r => getParser(r.command)()));
    const menusTexts = menus.map(
      (m, i) => `_${restaurants[i].name}_\n${menuToText(m)}`
    );

    return {
      text: `*Menus Today:*\n${menusTexts}`
    };
  } catch (error) {
    return { text: `Error: ${error}` };
  }
}

module.exports = { commandHandler, allHandler };
