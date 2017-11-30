import React from 'react'
import {BrowserRouter, Switch,Link, Route} from 'react-router-dom'
import Ads from './Ads'
import AnotherAds from './AnotherAds'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <BrowserRouter>
        <div style={{textAlign: "center"}}>
          <h1>this is Home Component</h1>
          <h3>
            <Link to={`${this.props.match.url}/ads`}> Ads </Link> ||
            <Link to={`${this.props.match.url}/anotherads`}> Another Ads </Link>
          </h3>
          <Switch>
            <Route path={`${this.props.match.path}/ads`} component={Ads} />
            <Route path={`${this.props.match.path}/anotherads`} component={AnotherAds} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
