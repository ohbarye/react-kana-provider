# React Kana Provider

A tiny context provider to build a better Japanese form.

NOTE: This library is really **experimental**. API, specification or anything can change in the future.

## Usage

You can see an example app in https://github.com/ohbarye/react-kana-provider/tree/master/example.

### Installation

```shell
npm install react-kana-provider
# or
yarn add react-kana-provider
```

### Basic

Let's see the easiest example.

![kana](https://user-images.githubusercontent.com/1811616/52522034-6d916200-2cc3-11e9-873f-99ac38a58de6.gif)

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { KanaProvider, KanaDispatcher, KanaConsumer } from "react-kana-provider";

const App = () => (
  <KanaProvider fieldNames={["last_name"]}>
    <KanaDispatcher>
      {({ setKana }) => (
        <input
          type="text"
          onChange={e => setKana("last_name", e.target.value)}
        />
      )}
    </KanaDispatcher>
    <KanaConsumer>
      {({ kana }) => (
        <input
          type="text"
          value={kana.last_name}
        />
      )}
    </KanaConsumer>
  </KanaProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
```

As like above, `react-kana-provider` serves 3 components.

1. `KanaProvider`
    - `KanaProvider` is a provider of context. You need to pass field names as props so that the context can have multiple kana. I believe it's very common that a Japanese form has two kana fields for last name and first name.
2. `KanaDispatcher`
    - `KanaDispatcher` is a consumer of context, but it serves dispatch method to let the context update kana which corresponds to the given field name.
3. `KanaConsumer`
    - `KanaConsumer` is a consumer of context to receive an object which contains kana.

### TypeScript

`KanaDispatcherProps` and `KanaConsumerProps` are available to give type definition.

```typescript
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  KanaProvider,
  KanaDispatcher,
  KanaConsumer,
  KanaDispatcherProps,
  KanaConsumerProps
} from "react-kana-provider";

const App = () => (
  <KanaProvider fieldNames={["last_name"]}>
    <KanaDispatcher>
      {({ setKana }: KanaDispatcherProps) => (
        <input
          type="text"
          onChange={e => setKana("last_name", e.target.value)}
        />
      )}
    </KanaDispatcher>
    <KanaConsumer>
      {({ kana }: KanaConsumerProps) => (
        <input
          type="text"
          value={kana.last_name}
         />
      )}
    </KanaConsumer>
  </KanaProvider>
  );
);

ReactDOM.render(<App />, document.getElementById("root"));
```


## Feature

This library uses:

- [React Context](https://reactjs.org/docs/context.html)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [historykana](https://github.com/terrierscript/historykana) (Many thanks to @terrierscript)

## Requirement

- `react >= 16.8`
