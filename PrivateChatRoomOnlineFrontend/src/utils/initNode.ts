// util.js

import { h, render } from 'vue'

export function initInstance(component: any, container: HTMLElement, option: any) {
  const vNode = h(component, option)
  render(vNode, container)
  if (container.firstElementChild) {
    document.body.appendChild(container.firstElementChild)
  }
  return vNode.component
}

export function getContainer() {
  return document.createElement('div')
}
