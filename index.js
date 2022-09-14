const fs = require("fs");
const cli = require("cac")();
const { getFileExtension, getFileName } = require("./lib/utils");

const REGISTERED_FLAGS = ["f", "file", "d", "dir", "h", "help", "s", "snippet"];

cli.option("-f", "--file <filename>", "Type a file name");
cli.option("-d", "--dir <dirname>", "Type a dir name");
cli.option("-s", "--snippet <snippet>", "Type a snippet name");
cli.help();
const parsed = cli.parse();

handleUnregisteredOption(parsed.options);
handleParsedOption(parsed.options);

function handleUnregisteredOption(options) {
  for (const flag of REGISTERED_FLAGS) {
    if (flag in options) return;
  }
  throw new Error("Unregistered options");
}

function handleFileOption(filename, snippetName) {
  if (typeof filename === "boolean") throw new Error("Type a filename");
  const snippetObj = JSON.parse(fs.readFileSync("snippet.json"));

  let snippet = [];
  if (snippetName) {
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
function handleDirOption(dirname) {
  if (typeof dirname === "boolean") throw new Error("Type a dirname");
}

function handleParsedOption(options) {
  const snippet = options.snippet || options.s;

  if ("f" in options) handleFileOption(options.f, snippet);
  if ("file" in options) handleFileOption(options.file, snippet);
  if ("d" in options) handleDirOption(options.d);
  if ("dir" in options) handleDirOption(options.dir);
}

// https://ourcodeworld.com/articles/read/393/how-to-create-a-global-module-for-node-js-properly
