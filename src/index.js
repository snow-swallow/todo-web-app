import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from "react-redux";
import configureStore from './redux/configureStore';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);