import { post, get, put, remove } from "./helpers/restClient";

export async function add{{modelNamePascal}}({{modelNameCamel}}) {
  return await post("{{modelNamePascal}}", {{modelNameCamel}});
}

export async function get{{modelNamePascal}}(id) {
  return await get("{{modelNamePascal}}", id);
}

export async function get{{pluralModelNamePascal}}() {
  return await get("{{pluralModelNamePascal}}");
}

export async function update{{modelNamePascal}}({{modelNameCamel}}) {
  return await put("{{modelNamePascal}}", {{modelNameCamel}});
}

export async function remove{{modelNamePascal}}(id) {
  return await remove("{{modelNamePascal}}", id);
}
