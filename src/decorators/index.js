import findLinkEntities from './findLinkEntities'
import LinkComponent from '../components/link-component'

const decoratorArray = [{
  strategy: findLinkEntities,
  component: LinkComponent,
}]

export default decoratorArray