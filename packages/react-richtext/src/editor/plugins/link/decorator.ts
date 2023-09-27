import { DraftDecorator } from 'draft-js';

import linkStrategy from './strategies/link';
import DecoratedLinkComponent from './components/LinkComponent';

export default (): Array<DraftDecorator> => [
  {
    strategy: linkStrategy(),
    component: DecoratedLinkComponent,
  },
];
