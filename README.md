# create-app

Generate an application form a simple json configuration. Perfect for MVP's and admin sites. Built on ideas from smalltalk and other data-model driven application creation.

## Getting started

```
1. clone repo
2. $ yarn install
3. $ yarn link
```

## Usage

```bash
$ create-app config.json
```

config.json

```json
{
  "name": "test-app",
  "template": "test"
}
```

## Status

Bearly begun but highly energized. Core templating engine added. See [change log](./doc/CHANGELOG.md).

## Contributors welcome

This project is in early stages and looking for contributers. See [design](./doc/DESIGN.md).

## Goals

Aim for progressive development with something useful asap See the [road map](./doc/ROADMAP.md).

## Todo

- loop template
- verbose option
- generated by template message
- add github test badge
- add github test action (pipeline)
- validate config
- single model app
