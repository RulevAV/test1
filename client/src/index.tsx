import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ModalWindowProvider } from './providers/ModalWindow/Modal/modal';
import { Provider } from 'react-redux';
import store from './redux/redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalWindowProvider>
        <App />
      </ModalWindowProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
