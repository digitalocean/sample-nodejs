import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { url } from './url';
import { ErrorBoundary } from './ErrorBoundary';
import Auth from './Auth';


const dev = process.env.NODE_ENV === 'development';

if (!window.pglOptions) window.pglOptions = {};
// const userPromise = fetch(url + 'login', { credentials: 'include' });

for (let [key, value] of Object.entries({
  dev,
  validate: true,
  prefill: dev,
  showState: dev,
  settings: dev,
  stayLoggedIn: false,
})) {
  const ls = localStorage[key]; //it's a string!!!!!
  if (ls) {
    window.pglOptions[key] = ls === 'true' ? true : false;
  } else {
    window.pglOptions[key] = value;
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <StrictMode>
      <Auth />
    </StrictMode>
  </ErrorBoundary>,
  document.getElementById('root')
);

if (dev) {
  const script = document.createElement('script');
  script.src = 'reload/reload.js';
  script.id = 'reload';
  document.body.appendChild(script);
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
