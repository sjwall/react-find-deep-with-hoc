import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react'

export type FindDeepResult = {
  found: ReactNode
  foundIndex: number
  parent?: ReactElement
  base: ReactElement
  tree?: FindDeepResult
}

export type FindPredicate = Parameters<Array<ReactNode>['find']>[0]

export function findDeep(
  node: ReactElement | undefined,
  predicate: FindPredicate,
): FindDeepResult | undefined {
  const children = Children.toArray(node)
  let result: FindDeepResult | undefined
  children.find((value, index, array) => {
    if (predicate(value, index, array)) {
      result = {
        found: value,
        foundIndex: index,
        base: node!,
      }
      return true
    }

    if (!isValidElement(value)) {
      return false
    }

    const deepResult = findDeep(value.props.children, predicate)
    if (deepResult) {
      result = {
        ...deepResult,
        base: value,
        tree: deepResult,
      }
      if (!result.parent) {
        result.parent = value
        delete result.tree
      }
    }
    return deepResult
  })
  return result
}
