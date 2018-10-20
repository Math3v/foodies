const forkysParser = require("./parser/forkys").parse;
const zlataLodParser = require("./parser/zlata-lod").parse;

function menuToText({ soups, mains }) {
  return `*Soups*:\n${soups.join("\n")}\n*Mains:*\n${mains.join("\n")}`;
}

function getParser(command) {
  if (command === "forkys") {
    return forkysParser;
  } else if (command === "lod") {
    return zlataLodParser;
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

module.exports.commandHandler = commandHandler;
