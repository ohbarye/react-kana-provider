import * as React from "react";
import * as historykana from "historykana";

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
    case "SET_KANA": {
      const { inputtedValue, fieldName } = action;
      const history = inputtedValue
        ? [...state.history[fieldName], inputtedValue]
        : [];

      return {
        ...state,
        history: {
          ...state.history,
          [fieldName]: history
        },
        kana: {
          ...state.kana,
          [fieldName]: historykana(history)
        }
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
  let state = {
    history: {},
    kana: {}
  };
  fieldNames.forEach(fieldName => {
    state.history[fieldName] = [];
    state.kana[fieldName] = "";
  });
  return state;
};

export const KanaProvider = ({
                               fieldNames,
                               children
                             }: {
  fieldNames: string[];
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    getInitialState(fieldNames)
  );
  return (
    <KanaContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </KanaContext.Provider>
  );
};

export const KanaDispatcher = ({ children }: { children: React.ReactNode }) => {
  const dispatch = React.useContext(DispatchContext);
  const setKana = (fieldName: string, inputtedValue: string) =>
    dispatch({ type: "SET_KANA", fieldName, inputtedValue });
  return children({ setKana });
};

export const KanaConsumer = ({ children }: { children: React.ReactNode }) => {
  const { kana } = React.useContext(KanaContext);
  return children({ kana });
};
