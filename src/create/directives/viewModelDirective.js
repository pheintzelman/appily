import { logger } from '../../logger.js';
import { merge } from '../../lib/merge.js';

export function viewModelDirective({ property, viewModel }) {
  logger.trace({ msg: `Add to view model`, property });

  return merge(viewModel, property);
}
