import { copyDir } from '../file/copyDir.js';

export async function loopDirective({ property, src, dest, viewModel }) {
  if (!Array.isArray(viewModel[property])) {
    return;
  }

  const promise = viewModel[property].map((viewPartial) => {
    return copyDir({ src, dest, viewModel: viewPartial });
  });

  return await Promise.all(promise);
}
