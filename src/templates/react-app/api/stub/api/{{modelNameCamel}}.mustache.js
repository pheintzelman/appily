function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function add{{modelNamePascal}}({{modelNameCamel}}) {
  await sleep(1000);
  throw Error('Not implemented');
}
