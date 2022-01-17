export function getSelectedDirectives(manifesto, selectedOptions) {
  const { directives } = manifesto;
  return directives
    .filter((directive) => selectedOptions.includes(directive.option))
    .map((directive) => directive.directive);
}

export function getSelectedOptions(manifesto, config) {
  const { options } = manifesto;

  return Object.entries(options)
    .filter(([key, value]) => value.length >= 1)
    .map(([key, value]) => {
      if (value.includes(config[key])) {
        return `${key}:${config[key]}`;
      }

      //include the first option by default
      return `${key}:${value[0]}`;
    });
}

export function getDirectives(manifesto, config) {
  const selectedOptions = getSelectedOptions(manifesto, config);
  return getSelectedDirectives(manifesto, selectedOptions);
}
