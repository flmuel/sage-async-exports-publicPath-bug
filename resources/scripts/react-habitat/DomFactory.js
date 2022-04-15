import React from 'react'
import ReactDOM from 'react-dom'

export default class DomFactory {
  inject(module, props = {}, target) {
    if (target) {
      ReactDOM.render(React.createElement(module, props || {}), target)
    } else {
      console.warn('RHW07', 'Target element is null or undefined.')
    }
  }

  dispose(target) {
    if (target) {
      ReactDOM.unmountComponentAtNode(target)
    }
  }
}
