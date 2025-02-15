import {
  Children,
  isValidElement,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from 'react'
import {findDeep, type FindDeepResult} from './findDeep'
import {rebuildTree} from './rebuildTree'

export type FindDeepWithHocResult =
  | [FC<PropsWithChildren>, ReactNode]
  | [undefined, undefined]

/**
 * Finds a node deep in the tree and returns it with a HOC that wraps its parents.
 *
 * @param node The tree to search in.
 * @param predicate The callback to check if a node is a match.
 * @returns A tuple where the first item is the Wrapper component and the second is the found node.
 */
export function findDeepWithHoc(
  node: ReactNode,
  predicate: Parameters<typeof findDeep>[1],
): FindDeepWithHocResult {
  let result: FindDeepResult | undefined
  Children.toArray(node)
    .filter((child) => isValidElement(child))
    .find((child) => {
      result = findDeep(child, predicate)
      if (result) {
        return true
      }
      return false
    })
  if (result) {
    return [
      ({children}: PropsWithChildren) => rebuildTree(result!, children),
      result.found,
    ]
  }
  return [undefined, undefined]
}
