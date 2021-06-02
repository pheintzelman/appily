#!/usr/bin/env node
const { readConfig } = require('./readConfig');

const [, , ...args] = process.argv;

async function main() {
  try {
    const config = await readConfig(args[0]);
    console.log(config);
  } catch (error) {
    console.log(error);
  }
}

main();
