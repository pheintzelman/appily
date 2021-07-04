import fsModule from 'fs';
import { getVariations } from '../src/lib/case.js';
const fs = fsModule.promises;

function templatize(content, prefix, name) {
  const nameVariations = Object.entries(getVariations(prefix, name));
  return nameVariations.reduce((templatizeContent, [name, find]) => {
    var re = new RegExp(find, 'g');
    return templatizeContent.replace(re, `{{${name}}}`);
  }, content);
}

const [_, dir, filePath, name] = process.argv;
const content = await fs.readFile(filePath, 'utf8');
const output = templatize(content, 'modelName', name);
const fileName = templatize(filePath, 'modelName', name);
const mustachefileName = fileName.replace('.js', '.mustache.js');

await fs.writeFile(mustachefileName, output, 'utf8');
