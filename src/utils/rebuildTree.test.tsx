import {View, Text} from 'react-native'
import {render} from '@testing-library/react-native'
import type {FindDeepResult} from './findDeep'
import {rebuildTree} from './rebuildTree'

describe('rebuildTree', () => {
  test('builds new tree', () => {
    const a = 'Hello'
    const b = <Text>{a}</Text>
    const c = <View>{b}</View>
    const tree = <View>{c}</View>

    const result: FindDeepResult = {
      found: a,
      foundIndex: 0,
      base: tree,
      parent: b,
      tree: {
        found: a,
        foundIndex: 0,
        base: c,
        parent: b,
        tree: {
          found: a,
          foundIndex: 0,
          base: b,
          parent: b,
        },
      },
    }

    const newTree = rebuildTree(result, 'World')

    expect(render(newTree).toJSON()).toMatchSnapshot()
  })
})
