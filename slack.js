const forkysParser = require("./parser/forkys").parse;
const zlataLodParser = require("./parser/zlata-lod").parse;

const parserMap = {
  'forkys': forkysParser,
  'lod': zlataLodParser,
};

function menuToText({ soups, mains }) {
  return `*Soups*:\n${soups.join("\n")}\n*Mains:*\n${mains.join("\n")}`;
}

function getParser(command) {
  return parserMap[command];
}

async function commandHandler({ command }) {
  const parser = getParser(command);
  if (!parser) {
    return { text: `Command '${command}' not supported.` };
  }

  try {
    const menu = await parser();
    return { text: menuToText(menu) };
  } catch (error) {
    return { text: `Error: ${error}` };
  }
}

module.exports.commandHandler = commandHandler;
