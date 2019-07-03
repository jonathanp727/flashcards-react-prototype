import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'scenes/Home';
import Dict from 'scenes/Dict';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/dict/:query' component={Dict} />
    </Switch>
  );
}

export default App;
