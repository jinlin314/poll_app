import React from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../containers/Home'
import Navigation from './Navbar'
import Polls from '../containers/Polls'

const App = () => (
  <BrowserRouter>
    <div className="primary-layout">
      <Navigation />
      <main>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/polls" component={Polls} />
          <Redirect from="/" to="/home" />
        </Switch>
      </main>
    </div>
  </BrowserRouter>
)

export default App
