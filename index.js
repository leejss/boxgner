const fs = require("fs");
const cli = require("cac")();
const { getFileExtension, getFileName } = require("./lib/utils");
const { exec } = require("child_process");

const REGISTERED_FLAGS = ["file", "dir", "help", "snippet", "config"];

init();

cli.option("--file", "Type a file name");
cli.option("--dir", "Type a dir name");
cli.option("--snippet", "Type a snippet name");
cli.option("--config", "Type a config path");
cli.help();
const parsed = cli.parse();
console.log(parsed);

handleUnregisteredOption(parsed);
handleParsedOption(parsed);

function handleUnregisteredOption(options) {
  for (const flag of REGISTERED_FLAGS) {
    if (flag in options) return;
  }
  exec("node index.js --help", (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
      // log and return if we encounter an error
      console.error("could not execute command: ", err);
      return;
    }
    // log the output received from the command
    console.log(output);
  });
}

function handleFileOption(parsed) {
  const { args, options } = parsed;
  const filename = args[0];
  if (args.length === 0) throw new Error("Type a filename");

  const snippetPath = JSON.parse(fs.readFileSync("./config.json")).snippetPath;
  const snippetObj = JSON.parse(fs.readFileSync(snippetPath));

  let snippet = [];
  if (options.snippet) {
    snippet = snippetObj[snippetName];
  } else {
    const extension = getFileExtension(filename);
    snippet = snippetObj[extension];
  }
  const name = getFileName(filename);
  for (const line of snippet) {
    const replaced = line.replace("$FILENAME", name);
    fs.writeFileSync(filename, `${replaced}\n`, {
      flag: "a",
    });
  }
}

function handleDirOption(parsed) {
  const { args } = parsed;
  if (args.length === 0) throw new Error("Type a dirname");
}

function handleConfigOption(parsed) {
  const path = parsed.options.config;
  fs.writeFileSync(
    "./config.json",
    JSON.stringify({
      snippetPath: path,
    })
  );
}

function handleParsedOption(parsed) {
  const { options } = parsed;
  if ("file" in options) handleFileOption(parsed);
  if ("dir" in options) handleDirOption(parsed);
  if ("config" in options) handleConfigOption(parsed);
}

// https://ourcodeworld.com/articles/read/393/how-to-create-a-global-module-for-node-js-properly

function init() {
  const isConfigExist = fs.existsSync("./sddsd.json");
  if (!isConfigExist) {
    fs.writeFileSync(
      "./config.json",
      JSON.stringify({
        snippetPath: "./snippet.json",
      })
    );
  }
}
