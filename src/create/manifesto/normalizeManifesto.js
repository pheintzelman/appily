function flatenDirectives(directives) {
  return directives.reduce((acc, { option, directive }) => {
    if (Array.isArray(directive)) {
      const subDirective = directive.map((command) => ({
        option,
        directive: command
      }));

      return [...acc, ...subDirective];
    }

    return [...acc, { option, directive }];
  }, []);
}

function normalizeDirective(directive) {
  if (directive.command && directive.args) {
    return { command: directive.command, args: directive.args };
  }

  const [key, value] = Object.entries(directive)[0];
  return { command: key, args: value };
}

function normalizeDirectives(directives) {
  const normalizedDirectives = directives.map((directive) => {
    if (directive.option && directive.directive) {
      return {
        option: directive.option,
        directive: directive.directive
      };
    }

    const [key, value] = Object.entries(directive)[0];
    return { option: key, directive: value };
  });

  const flatenedDirectives = flatenDirectives(normalizedDirectives);

  //normalizeDirective needs to be done after flatten as flatten adds directives
  return flatenedDirectives.map(({ option, directive }) => ({
    option,
    directive: normalizeDirective(directive)
  }));
}

export function normalizeManifesto(manifesto) {
  const { directives } = manifesto;

  return {
    ...manifesto,
    directives: normalizeDirectives(directives)
  };
}
