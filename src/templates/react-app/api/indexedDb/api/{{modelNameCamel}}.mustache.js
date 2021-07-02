import { add } from '../db/{{modelNameCamel}}';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function add{{modelNamePascal}}({{modelNameCamel}}) {
  await sleep(1000);
  const record = await add({{modelNameCamel}});
  console.log({ record });
}
