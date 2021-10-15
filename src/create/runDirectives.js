import path from 'path';
import { Directive } from '../constants/constants.js';
import { logger } from '../logger.js';
import { copyDirective } from './directives/copyDirective.js';
import { loopDirective } from './directives/loopDirective.js';
import { viewModelDirective } from './directives/viewModelDirective.js';
import { viewModelTransform } from './directives/viewModelTransform.js';
import { getDirectives } from './processManafesto.js';

async function runFileDirectives({
  directives,
  viewModel,
  metaData: { templateDir, dir }
}) {
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

async function runViewModelDirectives({
  directives,
  metaData: { templateDir },
  initialViewModel
}) {
  return directives.reduce(async (viewModel, directive) => {
    const resolvedViewModel = await viewModel;
    if (directive.key === Directive.ViewModel) {
      const property = directive.value;
      return viewModelDirective({ property, viewModel: resolvedViewModel });
    }

    if (directive.key === Directive.ViewModelTransform) {
      const { path: templatePath, method } = directive.value;
      const transformPath = path.join(templateDir, templatePath);
      return await viewModelTransform({
        path: transformPath,
        method,
        viewModel: resolvedViewModel
      });
    }

    return resolvedViewModel;
  }, initialViewModel);
}

export async function runDirectives({ viewModel: initialViewModel, metaData }) {
  const { manifesto, config } = metaData;
  const directives = getDirectives(manifesto, config);
  const viewModel = await runViewModelDirectives({
    directives,
    initialViewModel,
    metaData
  });
  logger.trace({ viewModel });

  await runFileDirectives({ directives, viewModel, metaData });
}
