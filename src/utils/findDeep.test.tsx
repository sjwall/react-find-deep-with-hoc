import {View, Text} from 'react-native'
import {findDeep, type FindDeepResult} from './findDeep'

describe('findDeep', () => {
  test('finds deep', () => {
    const a = 'Hello'
    const b = <Text>{a}</Text>
    const ba = <Text>Other</Text>
    const c = (
      <View>
        {ba}
        {b}
      </View>
    )
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

    const deepResult = findDeep(tree, (value) => value === 'Hello')

    expect(JSON.stringify(deepResult).replace(/"\.[01]"/g, 'null')).toEqual(
      JSON.stringify(result),
    )
  })
})
