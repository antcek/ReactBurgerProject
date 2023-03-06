import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app'
import { legacy_createStore as createStore } from 'redux';
import { rootReducer } from './services/reducers/root-reducer';
import { applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { ALL_CREATED_ORDERS_URL, PERSONAL_ORDERS_URL } from './utils/api';


export const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk,
    socketMiddleware(ALL_CREATED_ORDERS_URL),
    // socketMiddleware(PERSONAL_ORDERS_URL)
  )
  ));
// applyMiddleware через запятую socketMiddleware(url...)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
