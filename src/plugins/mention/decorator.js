/* eslint-disable import/no-anonymous-default-export */
import mentionStrategy from './strategies/mention';
import DecoratedMentionComponent from './components/decorated-result';

import mentionSuggestionStrategy from './strategies/mention-suggestion';
import MentionSuggestionComponent from './components/suggestion';

export default [
  {
    strategy: mentionStrategy,
    component: DecoratedMentionComponent,
  },
  {
    strategy: mentionSuggestionStrategy,
    component: MentionSuggestionComponent,
  }
]