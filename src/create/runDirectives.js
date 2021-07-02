import path from 'path';
import { Directive } from '../constants/constants.js';
import { logger } from '../logger.js';
import { kvp } from '../lib/kvp.js';
import { copyDirective } from './directives/copyDirective.js';
import { loopDirective } from './directives/loopDirective.js';
import { viewModelDirective } from './directives/viewModelDirective.js';
import { getViewModel } from './getViewModel.js';

function getDirectives(manifesto, selectedOptions) {
  const { directives } = manifesto;
  return directives
    .map(kvp)
    .filter((directive) => selectedOptions.includes(directive.key))
    .map((directive) => directive.value);
}

function getSelectedOptions(manifesto, config) {
  const { options } = manifesto;

  return Object.entries(options)
    .filter(([key, value]) => value.length >= 1)
    .map(([key, value]) => {
      if (value.includes(config[key])) {
        return `${key}:${config[key]}`;
      }

      //include the first option by default
      if (value.length >= 1) {
        return `${key}:${value[0]}`;
      }
    });
}

async function runFileDirectives({ directives, templateDir, dir, viewModel }) {
  for (const directive of directives) {
    if (directive.key === Directive.Copy) {
      const src = path.join(templateDir, directive.value.src);
      const dest = path.join(dir, directive.value.dest);
      await copyDirective({ src, dest, viewModel });
    }

    if (directive.key === Directive.Loop) {
      const src = path.join(templateDir, directive.value.src);
      const dest = path.join(dir, directive.value.dest);
      const { property } = directive.value;

      await loopDirective({ property, src, dest, viewModel });
    }
  }
}

function runViewModelDirectives({ directives, initialViewModel }) {
  return directives.reduce((viewModel, directive) => {
    if (directive.key === Directive.ViewModel) {
      const property = directive.value;
      return viewModelDirective({ property, viewModel });
    }

    return viewModel;
  }, initialViewModel);
}

export async function runDirectives({ config, dir, manifesto, templateDir }) {
  const selectedOptions = getSelectedOptions(manifesto, config);
  const directives = getDirectives(manifesto, selectedOptions).map(kvp);
  const initialViewModel = getViewModel({ config, manifesto, dir });
  const viewModel = runViewModelDirectives({ directives, initialViewModel });
  logger.trace({ viewModel });

  await runFileDirectives({ directives, templateDir, dir, viewModel });
}
