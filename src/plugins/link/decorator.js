/* eslint-disable import/no-anonymous-default-export */
import linkStrategy from './strategies/link';
import DecoratedLinkComponent from './components';

export default [
  {
    strategy: linkStrategy,
    component: DecoratedLinkComponent,
  }
]