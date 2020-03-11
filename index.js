const { name, version } = require("./package.json");
const program = require("commander");
// const lemuro = require("lemuro");
const { spawn } = require("child_process");

program.version(`${name}/${version}`).parse(process.argv);

const git = spawn("git", [
  "clone",
  "git@github.com:kirakira-template/node-template.git",
  "-b",
  "js-cli",
  "./tmp",
  "--depth",
  "1"
]);

let message = "";

git.stderr.on("data", data => {
  const text = data.toString();
  if (text.indexOf("Cloning into") > -1) {
    console.log("🦈 Cloing project now ..");
    message = "🐈 Ok project now is download in ur folder";
  } else {
    message = `🙅‍♂️ ${text}`;
  }
});

git.on("close", () => {
  console.log(message);
});
