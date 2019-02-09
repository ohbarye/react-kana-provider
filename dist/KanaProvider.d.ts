import * as React from "react";
export declare type KanaConsumerProps = {
    kana: {
        [field: string]: string;
    };
};
export declare type KanaDispatcherProps = {
    setKana: (fieldName: string, inputtedValue: string) => void;
};
export declare const KanaProvider: React.FunctionComponent<{
    fieldNames: string[];
}>;
export declare const KanaDispatcher: React.FunctionComponent;
export declare const KanaConsumer: React.FunctionComponent;
