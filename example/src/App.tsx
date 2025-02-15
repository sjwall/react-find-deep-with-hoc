import {
  Children,
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {findDeepWithHoc} from 'react-find-deep-with-hoc'

const Theme = ({children, name}: PropsWithChildren<{name: string}>) => {
  return (
    <View>
      <View style={{backgroundColor: name}}>{children}</View>
    </View>
  )
}

const CakeText = ({children}: PropsWithChildren) => {
  return <Text>{children}</Text>
}

const Cake = ({children}: PropsWithChildren) => {
  return <Text>Cake: {children}</Text>
}

const AppendSpongeToCake = ({children}: PropsWithChildren) => {
  const [Wrapper, found] = findDeepWithHoc(
    children,
    (node) => isValidElement(node) && node.type === CakeText,
  )
  if (!found) {
    return children
  }

  const oldCake = found as ReactElement<PropsWithChildren>

  const newCake = cloneElement(oldCake, {
    ...oldCake.props,
    children: [...Children.toArray(oldCake.props.children), ' Sponge'],
  })

  return <Wrapper>{newCake}</Wrapper>
}

export default function App() {
  return (
    <View style={styles.container}>
      <AppendSpongeToCake>
        <Theme name="orange">
          <Cake>
            <Theme name="purple">
              <CakeText>Victoria</CakeText>
            </Theme>
          </Cake>
        </Theme>
      </AppendSpongeToCake>

      <Theme name="orange">
        <Cake>
          <Theme name="purple">
            <Text>Victoria</Text>
          </Theme>
        </Cake>
      </Theme>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
