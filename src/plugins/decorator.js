/* eslint-disable import/no-anonymous-default-export */
import mentionDecorators from './mention/decorator';
import linkDecorators from './link/decorator';

export default [
  ...mentionDecorators,
  ...linkDecorators
];