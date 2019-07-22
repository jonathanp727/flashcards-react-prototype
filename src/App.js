import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'scenes/Home';
import Dict from 'scenes/Dict';
import Cards from 'scenes/Cards';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/dict/:query' component={Dict} />
      <Route path='/cards/' component={Cards} />
    </Switch>
  );
}

export default App;
