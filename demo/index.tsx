import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  KanaProvider,
  KanaDispatcher,
  KanaConsumer,
  KanaDispatcherProps,
  KanaConsumerProps
} from "react-kana-provider";

const App = () => {
  return (
    <KanaProvider fieldNames={["last_name", "first_name"]}>
      <form>
        <div>
          <span>Japanese Traditional Form</span>
        </div>
        <div>
          <div>
            <span>Name</span>
          </div>
          <NameField fieldName="last_name" />
          <NameField fieldName="first_name" />
        </div>
        <div>
          <div>
            <span>Name Kana</span>
          </div>
          <NameKanaField fieldName="last_name" />
          <NameKanaField fieldName="first_name" />
        </div>
      </form>
    </KanaProvider>
  );
};

const NameField = ({ fieldName }: { fieldName: string }) => (
  <KanaDispatcher>
    {({ setKana }: KanaDispatcherProps) => (
      <input
        type="text"
        onChange={e => setKana(fieldName, e.target.value)}
        placeholder={fieldName}
      />
    )}
  </KanaDispatcher>
);

const NameKanaField = ({ fieldName }: { fieldName: string }) => (
  <KanaConsumer>
    {({ kana }: KanaConsumerProps) => (
      <input type="text" value={kana[fieldName]} placeholder={fieldName} />
    )}
  </KanaConsumer>
);

ReactDOM.render(<App />, document.getElementById("root"));

// for Parcel HMR
if (module.hot) {
  module.hot.accept();
}
