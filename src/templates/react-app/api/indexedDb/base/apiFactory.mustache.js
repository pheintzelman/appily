{{#models}}
import { api as {{modelNameCamel}} } from './{{modelNameCamel}}'
{{/models}}

const mapper = {
  {{#models}}
  "{{modelName}}": {{modelNameCamel}},
  {{/models}}
};

export function apiFactory(modelName) {
  return mapper[modelName];
}
