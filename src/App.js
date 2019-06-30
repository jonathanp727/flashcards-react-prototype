import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={}/>
      <Route path='/lookup' component={}/>
      <Route path='/cards' component={}/>
    </Switch>
  );
}

export default App;
