/* eslint-disable import/no-anonymous-default-export */
import mentionStrategy from './strategies/mention';
import DecoratedMentionComponent from './components/decorated-mention';

import mentionSuggestionStrategy from './strategies/mention-suggestion';
import MentionSuggestionComponent from './components/mention';

export default (context) => [
  {
    strategy: mentionStrategy,
    component: DecoratedMentionComponent,
  },
  {
    strategy: mentionSuggestionStrategy(context),
    component: MentionSuggestionComponent,
  }
]