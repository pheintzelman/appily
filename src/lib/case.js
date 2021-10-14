function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

//for easier composition
function toLowerCase(word) {
  return word.toLowerCase();
}

function changeCase({ input, transform = toLowerCase, delimiter = '' }) {
  return input.split(' ').map(transform).join(delimiter);
}

export function pascalCase(input) {
  return changeCase({ input, transform: capitalizeFirstLetter });
}

export function camelCase(input) {
  return changeCase({
    input,
    transform: (part, index) =>
      index === 0 ? part.toLowerCase() : capitalizeFirstLetter(part)
  });
}

export function kebabCase(input) {
  return changeCase({
    input,
    delimiter: '-'
  });
}

export function snakeCase(input) {
  return changeCase({
    input,
    delimiter: '_'
  });
}

//how the string should look in the middle of a sentence
export function sentenceCase(input) {
  return changeCase({
    input,
    delimiter: ' '
  });
}

export function getVariations(name, string) {
  return {
    [name]: string,
    [`${name}Camel`]: camelCase(string),
    [`${name}Kebab`]: kebabCase(string),
    [`${name}Pascal`]: pascalCase(string),
    [`${name}SentenceCase`]: sentenceCase(string),
    [`${name}Snake`]: snakeCase(string)
  };
}
