export function getViewModel({ config, manifesto, dir }) {
  return {
    appName: config.name,
    dir,
    templateName: manifesto.name,
    templateVersion: manifesto.version
  };
}
