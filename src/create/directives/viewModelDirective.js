import { logger } from '../../logger.js';
import { merge } from '../../lib/merge.js';

export function viewModelDirective({ property, viewModel }) {
  logger.info('viewModelDirective');
  logger.trace({ property });

  return merge(viewModel, property);
}
