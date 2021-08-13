import url from 'url';
import { logger } from '../../logger.js';

export async function viewModelTransform({ path, method, viewModel }) {
  const { [method]: transform } = await import(url.pathToFileURL(path).href);
  return transform(viewModel, logger);
}
