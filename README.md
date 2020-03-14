## Kiracli

kiracli goal is to clone the template project under your project in the easiest way.

## Install

Read the follow to know how to install kiracli

### npx

```
npx kiracli
```

### npm

```
npm install kiracli -g
```

### yarn

```
yarn global add kiracli
```

## Usage

Read the follow to know how to use kiracli

```
Usage: kiracli [options]

Options:
  -V, --version              output the version number
  -o, --output <path>        down load template to where (default: "./")
  -t, --target <git>         git url
  -b, --branch <git-branch>  which branch to be download (default: "master")
  -h, --help                 output usage information
```

eg: `kiracli -t git@github.com:kirakira-template/node-template.git -b js-cli`

kiracli will remove template project `.git` folder by default

## Advanced

You can create a `kiraconfig.json` in project, kiracli will read this config.

You need to define two key `target` and `questions` in this json.

### target

`target` is an array of file path to help kiracli know which files should be replace by question answer.

### questions

`questions` also is an array to define `question_key`. And bootstrap user to answer question.

kiracli using `K{question_key}` statement to replace question's answer.

### example

```
{
  "target": ["package.json"],
  "questions": {
    "packageName": {
      "message": "What is your package name?"
    },
    "packageVerson": {
      "message": "What is your package verion?",
      "initial": "1.0.0" // default value can be ignore
    }
  }
}
```

when you using kiracli download template will show this question and auto replace `package.json` content.

### preview



## License

MIT © [YUXINO](https://github.com/kirakira-template/kiracli/blob/master/LICENSE)
