/* eslint-disable import/no-anonymous-default-export */
import getMentionDecorator from './mention/decorator';
import linkDecorators from './link/decorator';

export default (context) => [
  ...getMentionDecorator(context),
  ...linkDecorators(context)
];