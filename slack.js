const forkysParser = require("./parser/forkys").parse;

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
    const { soup, main } = await parser();
    return { text: `${soup}, ${main}` };
  } catch (error) {
    return { text: `Error: ${error}` };
  }
}

module.exports.commandHandler = commandHandler;
