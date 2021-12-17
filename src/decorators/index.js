import findLink from './strategies/link';
import LinkComponent from '../components/link';

import findMentionSuggestion from './strategies/mention';
import MentionsSuggestionComponent from '../components/mention/dropdown';

const decoratorArray = [
  {
    strategy: findLink,
    component: LinkComponent,
  },
  {
    strategy: findMentionSuggestion,
    component: MentionsSuggestionComponent,
  },
]

export default decoratorArray