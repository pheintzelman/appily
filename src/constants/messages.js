export const ConfigIsEmpty = () => 'Config is empty or undefined';
export const ConfigPropertyNotSupported = (key) =>
  `"${key}" is not a supported config property`;
export const TemplateOptionNotSupported = (key, value) =>
  `"${key}:${value}" is not a supported template option`;
export const TypeNotSupported = (model, property, type) =>
  `"${model}" : "${property}" is not a supported type (${type})`;
export const TypeSelfReferenced = (model, property) =>
  `"${model}" : "${property}" can not self-reference "${model}"`;
