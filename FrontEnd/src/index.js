import Loading from 'components/Global/Elements/Loading/Loading';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from 'store/store';
import App from './App';
import './index.css';
import './utils/i18nInit.js'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Suspense fallback={<Loading/>}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);
