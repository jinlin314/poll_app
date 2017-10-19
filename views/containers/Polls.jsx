import React from 'react'
import axios from 'axios'
import Card from '../components/Card'

export default class Polls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: []
    }
    this.getAllPolls = this.getAllPolls.bind(this)
  }

  componentDidMount() {
    this.getAllPolls();
  }

  getAllPolls() {
    axios.get('/api/polls')
      .then(res => res.data)
      .then(polls => this.setState({polls: polls}))
      .catch(console.error)
  }

  render() {
    console.log("polls = ", this.state.polls)
    const cards = this.state.polls.map(poll => {
      return <Card
        key={`qid${poll.id}`}
        poll={poll} />

    })

    return (
      <div className="container">
        { cards }
      </div>
    )
  }
}
