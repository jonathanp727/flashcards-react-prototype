import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router-dom';

import history from 'services/history';

// Hacky way to store USER_ID
window.USER_ID = '5d4337bed07c0b2c6f333976'; // username: TEST ACCOUNT DO NOT DELETE
//window.USER_ID = '5d4345edd07c0b2c6f333977'; // username: lol

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
