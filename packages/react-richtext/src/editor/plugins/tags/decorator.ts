import { DraftDecorator } from 'draft-js';

import tagStrategy from './strategies/tagStrategy';
import DecoratedTag from './components/DecoratedTag';

import tagsSuggestionStrategy from './strategies/tagsSuggestionStrategy';
import TagSuggestionAnchor from './components/TagSuggestionAnchor';

export default (context: IEditorContext): Array<DraftDecorator> => [
  {
    strategy: tagStrategy(),
    component: DecoratedTag,
  },
  {
    strategy: tagsSuggestionStrategy(context),
    component: TagSuggestionAnchor,
  },
];
