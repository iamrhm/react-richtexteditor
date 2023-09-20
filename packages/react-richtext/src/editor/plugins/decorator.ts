import { DraftDecorator } from 'draft-js';
import { IEditorContext } from '@packages/types';

import getMentionDecorator from './tags/decorator';
import linkDecorators from './link/decorator';

export default (context: IEditorContext): Array<DraftDecorator> => [
  ...getMentionDecorator(context),
  ...linkDecorators(),
];
