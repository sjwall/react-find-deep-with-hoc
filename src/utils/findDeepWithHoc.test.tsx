import {View, Text} from 'react-native'
import {render} from '@testing-library/react-native'
import {findDeepWithHoc} from './findDeepWithHoc'

describe('findDeepWithHoc', () => {
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

    const [Wrapper, found] = findDeepWithHoc(tree, (value) => value === 'Hello')

    expect(found).toEqual('Hello')
    // @ts-expect-error fail if undefined
    expect(render(<Wrapper>{found} World</Wrapper>).toJSON()).toMatchSnapshot()
  })

  test("doesn't find", () => {
    const a = 'Hello World'
    const b = <Text>{a}</Text>
    const ba = <Text>Other</Text>
    const c = (
      <View>
        {ba}
        {b}
      </View>
    )
    const tree = <View>{c}</View>

    const [Wrapper, found] = findDeepWithHoc(tree, (value) => value === 'Hello')

    expect(found).toBeUndefined()
    expect(Wrapper).toBeUndefined()
  })
})
