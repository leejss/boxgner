const fs = require("fs");
// const cli = require("cac")();

// cli.option("--name <name>", "Choose a dir name");
// cli.help();

// const parsed = cli.parse();
// console.log(parsed.options);

// if ("name" in parsed.options) {
//   fs.mkdirSync(parsed.options.name);
//   fs.writeFileSync(
//     `${parsed.options.name}/index.tsx`,
//     fs.readFileSync("template/index.tsx")
//   );
// } else {
//   throw new Error("Invalid flag");
// }

// console.log(JSON.stringify(parsed, null, 2));

// npx boxgner lib
// npx boxgner -t page

// https://ourcodeworld.com/articles/read/393/how-to-create-a-global-module-for-node-js-properly

const file = fs.readFileSync("template.json");
const fileObj = JSON.parse(file);

for (const line of fileObj.tsx) {
  const replaced = line.replace("$FILENAME", "Button");
  fs.writeFileSync("Button.tsx", `${replaced}\n`, {
    flag: "a",
  });
}

// boxgner Button.tsx

// use string replace
