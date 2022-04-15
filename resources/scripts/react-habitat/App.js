import { Bootstrapper, ContainerBuilder } from 'react-habitat'
import chain from 'ramda/es/chain'
import compose from 'ramda/es/compose'
import map from 'ramda/es/map'
import toPairs from 'ramda/es/toPairs'
import DomFactory from './DomFactory'

const getContexts = () => [
  require.context(
    'scripts/components/',
    true,
    /scripts\/components\/.*habitat\.js$/,
  )
]

const getAsyncContexts = () => [
  require.context(
    'scripts/components/',
    true,
    /scripts\/components\/.*habitat-async\.js$/,
  ),
]

const getRegisteredComponents = compose(
  chain((context) => map((key) => context(key).default)(context.keys())),
)

class ReactHabitatApp extends Bootstrapper {
  constructor() {
    super()

    const contexts = getContexts()
    const asyncContexts = getAsyncContexts()

    this.componentSelector = 'data-sage-component'
    this.updateComponents(contexts, asyncContexts)

    if (module.hot) {
      const dependencies = [...contexts, ...asyncContexts].map((c) => c.id)

      module.hot.accept(dependencies, () => {
        this.dispose()
        this.updateComponents(getContexts(), getAsyncContexts())
      })
    }
  }

  updateComponents(contexts, asyncContexts) {
    const builder = new ContainerBuilder()

    builder.factory = new DomFactory()

    const components = getRegisteredComponents(contexts)
    const asyncComponents = getRegisteredComponents(asyncContexts)

    const componentPairs = chain(toPairs, components)
    const asyncComponentPairs = chain(toPairs, asyncComponents)

    componentPairs.forEach(([name, component]) =>
      builder.register(component).as(name),
    )
    asyncComponentPairs.forEach(([name, component]) =>
      builder.registerAsync(component).as(name),
    )

    this.setContainer(builder.build())
  }
}

export default new ReactHabitatApp()
