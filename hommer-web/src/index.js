import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api';
//theme
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";

import 'primeicons/primeicons.css';
import { LEVEL, Logger } from '@kcram-solutions/logger';

Logger.level = LEVEL.DEBUG;
//Logger.level = LEVEL.WARN; // production
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
