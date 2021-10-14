# Prereqs

## Docker

1. go to https://www.docker.com/get-started
2. Download docker desktop

# Getting started

```bash
$ npm install
$ npm start
```

Sever will run at http://localhost:3001

{{#flags.postgres}}

# DB

```bash
$ npm install
$ npm run db:up
```

## Initialize DB

```bash
$ npm run db:sync
```

## Rest DB

This will wipe out everything

```bash
$ npm run db:reset
```

{{/flags.postgres}}
