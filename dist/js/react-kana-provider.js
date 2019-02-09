import { createContext, useReducer, createElement, useContext } from 'react';
import historykana from 'historykana';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function reducer(state, action) {
    var _a, _b;
    switch (action.type) {
        case "SET_KANA": {
            var inputtedValue = action.inputtedValue, fieldName = action.fieldName;
            var history_1 = inputtedValue
                ? state.history[fieldName].concat([inputtedValue]) : [];
            return __assign({}, state, { history: __assign({}, state.history, (_a = {}, _a[fieldName] = history_1, _a)), kana: __assign({}, state.kana, (_b = {}, _b[fieldName] = historykana(history_1), _b)) });
        }
        default: {
            return state;
        }
    }
}
var KanaContext = createContext(null);
var DispatchContext = createContext(null);
var getInitialState = function (fieldNames) {
    var state = {
        history: {},
        kana: {}
    };
    fieldNames.forEach(function (fieldName) {
        state.history[fieldName] = [];
        state.kana[fieldName] = "";
    });
    return state;
};
var KanaProvider = function (_a) {
    var fieldNames = _a.fieldNames, children = _a.children;
    var _b = useReducer(reducer, getInitialState(fieldNames)), state = _b[0], dispatch = _b[1];
    return (createElement(KanaContext.Provider, { value: state },
        createElement(DispatchContext.Provider, { value: dispatch }, children)));
};
var KanaDispatcher = function (_a) {
    var children = _a.children;
    var dispatch = useContext(DispatchContext);
    var setKana = function (fieldName, inputtedValue) {
        return dispatch({ type: "SET_KANA", fieldName: fieldName, inputtedValue: inputtedValue });
    };
    return (typeof children === 'function') ? children({ setKana: setKana }) : null;
};
var KanaConsumer = function (_a) {
    var children = _a.children;
    var kana = useContext(KanaContext).kana;
    return (typeof children === 'function') ? children({ kana: kana }) : null;
};

export { KanaProvider, KanaDispatcher, KanaConsumer };
