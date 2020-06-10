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
    "packageVersion": {
      "message": "What is your package version?",
      "initial": "1.0.0" // default value can be ignore
    }
  }
}
```

when you using kiracli download template will show this question and auto replace `package.json` content.

### preview

<img width="697" alt="Screen Shot 2020-03-14 at 5 54 03 PM" src="https://user-images.githubusercontent.com/12481935/76679633-1889f300-661d-11ea-91d3-2968e21e3e44.png">

## License

MIT © [YUXINO](https://github.com/kirakira-template/kiracli/blob/master/LICENSE)
