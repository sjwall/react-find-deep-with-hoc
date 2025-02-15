import {cloneElement, type ReactElement, type ReactNode} from 'react'
import type {FindDeepResult} from './findDeep'

export function rebuildTree(
  result: FindDeepResult,
  children: ReactNode,
): ReactElement {
  let newChildren: ReactNode
  if (result.tree) {
    newChildren = rebuildTree(result.tree, children)
  } else {
    newChildren = children
  }
  const clone = cloneElement(result.base, {
    ...result.base.props,
    children: newChildren,
  })
  return clone
}
