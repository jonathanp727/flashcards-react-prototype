import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router-dom';

import history from 'services/history';

// Hacky way to store USER_ID
window.USER_ID = '5d262b16cb7288941fb85608';

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
