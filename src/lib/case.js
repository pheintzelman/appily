function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1).toLowerCase();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function pascalCase(string) {
  return string.split(' ').map(capitalizeFirstLetter).join('');
}

export function camelCase(string) {
  return string
    .split(' ')
    .map((part, index) =>
      index === 0 ? lowerCaseFirstLetter(part) : capitalizeFirstLetter(part)
    )
    .join('');
}
