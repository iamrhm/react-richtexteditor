import findLink from './strategies/findLink';
import LinkComponent from '../components/links';

import findMention from './strategies/findMention';
import MentionsComponent from '../components/mention';

const decoratorArray = [
  {
    strategy: findLink,
    component: LinkComponent,
  },
  {
    strategy: findMention,
    component: MentionsComponent,
  },
]

export default decoratorArray