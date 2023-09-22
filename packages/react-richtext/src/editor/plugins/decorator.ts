import { DraftDecorator } from 'draft-js';

import getMentionDecorator from './tags/decorator';
import linkDecorators from './link/decorator';
import { IEditorContext } from '../../types';

export default (context: IEditorContext): Array<DraftDecorator> => [
  ...getMentionDecorator(context),
  ...linkDecorators(),
];
