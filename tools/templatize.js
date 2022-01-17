//e.g. node tools/templatize.js tools/videoGame.js "Video Game" "Video Games"

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

const [_, dir, filePath, name, puralName] = process.argv;
const content = await fs.readFile(filePath, 'utf8');
const pass1 = templatize(content, 'pluralModelName', puralName);
const output = templatize(pass1, 'modelName', name);
const fileName = templatize(filePath, 'modelName', name);
const mustachefileName = fileName.replace('.js', '.mustache.js');

await fs.writeFile(mustachefileName, output, 'utf8');
