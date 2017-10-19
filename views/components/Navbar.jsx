import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = (props) => {
  return (
    <div className="w3-bar w3-black">
      <Link to="/" className="w3-bar-item w3-button">PollApp</Link>
      <Link to="/polls" className="w3-bar-item w3-button">Polls</Link>
      <a href="#" className="w3-bar-item w3-button pull-right">Sign In</a>
      <a href="#" className="w3-bar-item w3-button pull-right">Login In</a>
    </div>
  )
}

module.exports = Navigation