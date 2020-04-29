/**
 * React app for the search bar
 */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';

const wheelEl = document.getElementById('wheel-app');

if(wheelEl) {
  ReactDOM.render(
    <App />,
    wheelEl
  );
}
