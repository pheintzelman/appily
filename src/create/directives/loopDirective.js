import * as copyDirModule from '../file/copyDir.js';

// Needed because es6 doesn't allow re-writing modules
let { copyDir } = copyDirModule;
export function mockDependencies(mockedModule) {
  ({ copyDir } = mockedModule ?? copyDirModule);
}

export async function loopDirective({ property, src, dest, viewModel }) {
  if (!Array.isArray(viewModel[property])) {
    return;
  }

  const promise = viewModel[property].map((viewPartial) => {
    return copyDir({ src, dest, viewModel: viewPartial });
  });

  return await Promise.all(promise);
}
