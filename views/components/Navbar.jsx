import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = (props) => {
  return (
  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand">PollApp</a>
      </div>
      <ul className="nav navbar-nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/polls">Polls</Link></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
        <li><Link to="/"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
      </ul>
    </div>
  </nav>
  )
}

module.exports = Navigation