import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/details'

export default function routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details" component={Details} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
