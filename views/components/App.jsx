import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from '../containers/Home'
import Navigation from './Navbar'
import Polls from '../containers/Polls'

const App = () => (
  <div className="primary-layout">
    <Navigation />

    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/polls" component={Polls} />
      </Switch>
    </main>
  </div>
)

module.exports = App
