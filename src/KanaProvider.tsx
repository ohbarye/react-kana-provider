import * as React from 'react';
import historykana from 'historykana';

type KanaProviderState = {
  history: {
    [field: string]: string[];
  };
  kana: {
    [field: string]: string;
  };
};

export type KanaConsumerProps = {
  kana: {
    [field: string]: string;
  };
};

export type KanaDispatcherProps = {
  setKana: (fieldName: string, inputtedValue: string) => void;
};

function reducer(state: KanaProviderState, action: any) {
  switch (action.type) {
    case 'SET_KANA': {
      const { inputtedValue, fieldName } = action;
      const history = inputtedValue
        ? [...state.history[fieldName], inputtedValue]
        : [];

      return {
        ...state,
        history: {
          ...state.history,
          [fieldName]: history,
        },
        kana: {
          ...state.kana,
          [fieldName]: historykana(history),
        },
      };
    }
    default: {
      return state;
    }
  }
}

const KanaContext = React.createContext<KanaProviderState>(null as any);
const DispatchContext = React.createContext<React.Dispatch<any>>(null as any);

const getInitialState = (fieldNames: string[]): KanaProviderState => {
  let state: any = {
    history: {},
    kana: {},
  };
  fieldNames.forEach(fieldName => {
    state.history[fieldName] = [];
    state.kana[fieldName] = '';
  });
  return state;
};

export const KanaProvider: React.FunctionComponent<{
  fieldNames: string[];
}> = ({ fieldNames, children }) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    getInitialState(fieldNames),
  );
  return (
    <KanaContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </KanaContext.Provider>
  );
};

export const KanaDispatcher: React.FunctionComponent = ({ children }) => {
  const dispatch = React.useContext(DispatchContext);
  const setKana = (fieldName: string, inputtedValue: string) =>
    dispatch({ type: 'SET_KANA', fieldName, inputtedValue });
  return typeof children === 'function' ? children({ setKana }) : null;
};

export const KanaConsumer: React.FunctionComponent = ({ children }) => {
  const { kana } = React.useContext(KanaContext);
  return typeof children === 'function' ? children({ kana }) : null;
};
