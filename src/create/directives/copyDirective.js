import { copyDir } from '../file/copyDir.js';

export async function copyDirective({ src, dest, viewModel }) {
  return await copyDir({ src, dest, viewModel });
}
