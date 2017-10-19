import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = (props) => {
  return (
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand">PollApp</a>
      </div>
      <ul class="nav navbar-nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/polls">Polls</Link></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><Link to="/"><span class="glyphicon glyphicon-user"></span> Sign Up</Link></li>
        <li><Link to="/"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
      </ul>
    </div>
  </nav>
  )
}

module.exports = Navigation