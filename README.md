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

## License

MIT © [YUXINO](https://github.com/kirakira-template/kiracli/blob/master/LICENSE)
