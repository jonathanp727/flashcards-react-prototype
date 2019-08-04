import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router-dom';

import history from 'services/history';

// Hacky way to store USER_ID
window.USER_ID = '5d473b4ac0771f1f50d7b1db'; // username: TEST ACCOUNT DO NOT DELETE

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
