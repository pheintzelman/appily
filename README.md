# appily

Generate an application form a simple json configuration. Perfect for MVP's and admin sites. Built on ideas from smalltalk and other data-model driven application creation.

Build an appilcation in minutes not months!

## Status

Alpha. We have met our alpha goals!  
Appily can generate a react app that is able to perform full CRUD operations, with an Express, Postgres backend.

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
  "name": "video-game-app",
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

## Config

| Property | Description                                                                  | Default  |
| -------- | ---------------------------------------------------------------------------- | -------- |
| name     | The name of your app                                                         | app      |
| dir      | The relative directory the app will be created in                            | /        |
| api      | express, indexedDB or stub                                                   | express  |
| db       | postgres, indexedDB or none                                                  | postgres |
| models   | The data and relationships that make up your app, see below for more details | {}       |

<i>To use indexedDB you must set indexedDB for api and db </i>

<i>The above is based on the react template, you can make your own templates</i>

### Models

models is a collection of models which are used to generate the UI, Api and DB

```
models {
  modelName: {
      "plural": modelNamePlural,
      "properties": properties
  },
  ...
}
```

You can also use the short form

```
models {
  modelName: properties,
  ...
}
```

modelName: should be the name of your model as you want displayed in the app. It is recomended to include spaces.

Examples: "Theme Park Ride", "Car Part"...

### properties

Properties are a colection of the properties in your model.

```
properties {
  propertyName: {type: type},
  ...
}
```

You can also use the short form

```
properties {
  propertyName: type,
  ...
}
```

propertyName: should be the name of the model's property as you want displayed in the app. It is recomended to include spaces.

Examples: "Year Made", "Color"...

#### required property

To make a property required simple add an \* to the end of its name

```
properties {
  propertyName*: type,
  ...
}
```

<i>Note the \* will not be part of the properties' name</i>

you can also do

```
properties {
  propertyName: {type: type, required: true},
  ...
}
```

### types

Types should be in quoutes like

```
properties {
  propertyName: "String",
  ...
}
```

Supported types

| Type      | Description     | Renders As |
| --------- | --------------- | ---------- |
| "String"  | A simple string | An Input   |
| "Boolean" | True or false   | A Checkbox |

<i>More types are coming</i>

## Contributors welcome

This project is in early stages and looking for contributers. See [design](./doc/DESIGN.md).

## Goals

Aim for progressive development with something useful asap See the [road map](./doc/ROADMAP.md).

## Todo

- add github test badge
- add github test action (pipeline)
- add options cli option, print out options from manfesto
- add tests for cli
- try to fix nested app issue (apps don't run from manual folder - nested npm package issue confuses npm install)
- make tests cross OS
- add support for nested models
  - add validation
  - detect relationships
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
- add required properties
  - [x] add to viewModel
  - [x] add to UI
  - [x] rename edit to input
  - [x] make react-app the default template
  - [ ] add to api
  - [ ] add to db
  - [ ] add validation on type
  - [ ] add required to Boolean

### Appily

- add config validation for model and properties

### Client

- add cancel edit button

### Sever

- move base out of express
- have docker include express server
- add logger (Pino?)
- add env support

### Later

- Pull validation into is own npm package
  - remove shared code
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
