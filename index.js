const { name, version } = require("./package.json");
const program = require("commander");
const lemuro = require("lemuro");
const { spawn } = require("child_process");
const Spinner = require("cli-spinner").Spinner;
const { Input } = require("enquirer");

const _tmpFolder = `./kira_template`;
const _kiraConfig = `${_tmpFolder}/kiraconfig.json`;
const _output = "./";
const _branch = "master";

let message = "";
let successs = true;

program
  .version(`${name}/${version}`)
  .option("-o, --output <path>", "down load template to where", _output)
  .option("-t, --target <git>", "git url")
  .option("-b, --branch <git-branch>", "which branch to be download", _branch)
  .parse(process.argv);

const args = program.opts();

async function main() {
  // clear if `_tmpFolder` exists
  await lemuro.deleteExists(_tmpFolder);

  // execute git command
  const git = spawn("git", [
    "clone",
    "git@github.com:kirakira-template/node-template.git",
    "--depth",
    "1",
    "-b",
    args.branch || _branch,
    `./${_tmpFolder}`
  ]);

  const spinner = new Spinner("📦  Now we are downloading template %s");
  // spinner.setSpinnerString(" ⠐⠄ ⢀ ⠁ ");

  git.stderr.on("data", data => {
    const text = data.toString();
    if (text.indexOf("Cloning into") > -1) {
      console.log("🦈  Ok, let's starting work !");
      spinner.start();
      message = "🐈  Project now is downloaded in ur folder ~";
      successs = true;
    } else {
      message = `🙅‍♂️  ${text}`;
      successs = false;
    }
  });

  git.on("close", async () => {
    spinner.clearLine();
    spinner.stop();
    console.log();

    successs && (await inject());
  });
}

async function inject() {
  // check config file
  if (await lemuro.isExists(_kiraConfig)) {
    console.log("🎈 Let's do some questions");
    const buffer = await lemuro.readFile(_kiraConfig);
    const content = await buffer.toString();
    const json = JSON.parse(content);
    const { target, questions } = json;
    const answers = {};

    // load ansers
    for (let key in questions) {
      const prompt = new Input(questions[key]);
      answers[key] = await prompt.run();
    }

    // replace content
    for (let _taget of target) {
      let targetPath = `${_tmpFolder}/${_taget}`;
      let targetContent = (await lemuro.readFile(targetPath)).toString();

      for (let key in answers) {
        const regexp = new RegExp(`K{${key}}`, "g");
        targetContent = targetContent.replace(regexp, answers[key]);
      }

      await lemuro.rmrf(targetPath);
      await lemuro.writeFile(targetPath, targetContent);
    }
  } else {
    console.log("😯  not kiraconfig");
  }

  await lemuro.deleteExists(`${_tmpFolder}/.git`);
  await lemuro.moveFiles(_tmpFolder, args.output || _output);

  console.log(message);
}

function isGitUrl(url) {
  const regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/;
  return regex.test(url);
}

if (isGitUrl(args.target) === false) {
  console.log("😖 Pls input a right git url");
} else {
  main();
}
