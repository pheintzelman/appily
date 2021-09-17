
export const models = {
  {{#models}}
  "{{modelName}}": {
      primaryProperty: "{{primaryPropertyCamel}}"
  },
  {{/models}}
};
