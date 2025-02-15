# react-find-deep-with-hoc

[![npm version](https://badge.fury.io/js/react-find-deep-with-hoc.svg)][npm]
[![npm downloads](https://img.shields.io/npm/dw/react-find-deep-with-hoc?logo=npm&label=NPM%20downloads&cacheSeconds=3600)][npm]
[![GitHub license](https://img.shields.io/github/license/sjwall/react-find-deep-with-hoc)][license]
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)][pr]

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

[license]: https://github.com/sjwall/react-find-deep-with-hoc/blob/main/LICENSE
[npm]: https://www.npmjs.com/package/react-find-deep-with-hoc
[pr]: http://makeapullrequest.com
