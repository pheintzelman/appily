# appily

Generate an application form a simple json configuration. Perfect for MVP's and admin sites. Built on ideas from smalltalk and other data-model driven application creation.

## Status

Alpha. We have met our alpha goals!  
Appily can generate a react app that is able to perform full CRUD opperations, against indexedDb.
Express is now an option but there is no db setup yet.

![First app](doc/images/first-app-2021-06-17.png)

See [change log](./doc/CHANGELOG.md) for more details.

## Getting started

### Install

```bash
$ npm install appily -g
```

### Dev Setup

```
Environment Requirements

1. Node >= 14.x
2. Yarn
```

```
1. clone repo
2. $ yarn install
3. $ yarn link
```

### Usage

```bash
$ appily config.json
```

config.json

```json
{
  "name": "test-app",
  "template": "test"
}
```

## Config

| Property | Description                                                                  | Default                         |
| -------- | ---------------------------------------------------------------------------- | ------------------------------- |
| name     | The name of your app                                                         | app                             |
| template | What type of app you are creating, can be react or test                      | react-app                       |
| dir      | The relative directory the app will be created in                            | /                               |
| ui       | Specify what UI you would like, values depend on the template                | default depends on the template |
| api      | Specify what API you would like, values depend on the template               | default depends on the template |
| db       | Specify what DB you would like, values depend on the template                | default depends on the template |
| models   | The data and relationships that make up your app, see below for more details | {}                              |

### Models

| Property          | Description                 | Default |
| ----------------- | --------------------------- | ------- |
| _your model name_ | The defintion of your model | {}      |

### Model

| Property             | Description          | Default  |
| -------------------- | -------------------- | -------- |
| _your property name_ | type of the property | "String" |

### Template

Each template has its own set of options for ui, api and db, which change how the app is constucted.

**react-app**
| Property | options | Default |
| ------------- | ------------- | -----
| ui | react | react
| api | indexedDB, stub, express | indexedDB
| db | indexedDB, none | indexedDB

_more options coming_

## Example config

```
{
  "name": "video-game-app",
  "template": "react-app",
  "models": {
    "Video Game": {
      "Title": "String",
      "Year Published": "String"
    },
    "Publisher": {
      "Name": "String"
    }
  }
}
```

## Contributors welcome

This project is in early stages and looking for contributers. See [design](./doc/DESIGN.md).

## Goals

Aim for progressive development with something useful asap See the [road map](./doc/ROADMAP.md).

## Todo

- remove `viewModelDirective.js` (or rename to `packageDirective.js` and repurpose for packages)
- add github test badge
- add github test action (pipeline)
- add options cli option, print out options from manfesto
- add tests for missing coverage
- try to fix nested app issue (apps don't run from manual folder - nested npm package issue confuses npm install)
- make directives groupable
- make docs easier to understand
  - list supported types
- make tests cross OS
- add support for nested models
  - add validation (done)
  - detect relationships (done) - may need to define more
  - create api/db to support this
  - support single model relationship UI: add, remove
  - support multi model relationship UI: add, remove
- add types
  - Number - Alex calls dibs
  - DateTime
  - Enum
  - link
- add better formatting/styling to types
  - string elipses, wrapping, etc
- add spinner progress button
- internationalize app (setup)
- resolve `Test environment has been torn down` issue

# Later

- add better table filter
- add types
  - tags
  - address
  - phone
  - year
  - dob
  - date range
  - time range
  - time
  - curency
  - quantity
- add computed properties
