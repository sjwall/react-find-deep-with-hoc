# react-find-deep-with-hoc

React find deep utility that also finds the HOCs.

## Installation

```sh
npm install react-find-deep-with-hoc
```

## Usage

```tsx
import { findDeepWithHoc } from 'react-find-deep-with-hoc';

const HelloWorld = ({children}: PropsWithChildren) => {
  const [Wrapper, found] = findDeepWithHoc(children, (node) => node === 'Hello')
  return <Wrapper>{found}{' World'}</Wrapper>
}

const ComponentA = () => (
  <HelloWorld>
    <View>
      <View>
        <Text>Hello</Text>
      </View>
    </View>
  </HelloWorld>
)

```

In the example ComponentA result will be:

```tsx
<View>
  <View>
    <Text>Hello World</Text>
  </View>
</View>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
