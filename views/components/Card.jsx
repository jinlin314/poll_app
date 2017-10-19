import React from 'react';

const Card = (props) => {
  const poll = props.poll
  let total = 0
  poll.PollOptions.forEach(option => {
    total += option.Poll_option_detail.votes
  })

  return (
      <div className="card w3-card-4 w3-dark-grey col-lg-6 col-md-12 col-sm-12 col-xs-12 w3-animate-bottom" >
        <div className="w3-container w3-center">
          <h2>{poll.question}</h2>
          <p>{total} People have voted</p>
            <div className="options">
              <form>
                {
                  poll.PollOptions.map((option, i) => {
                    return (
                      <div key={`p${poll.id}o${option.id}`}>
                        <input className="w3-radio" type="radio" name={`option${option.id}`} value={`option${option.id}`} />
                        <label>{option.text}</label>
                      </div>
                    )
                  })
                }
              </form>
            </div>

            <p>Created by: {poll.User.email}</p>
            <p>Created at: {poll.createdAt.substr(0,10)}</p>

            <div className="w3-section">
              <button className="w3-button w3-red">Not Interested</button>
              <button className="w3-button w3-green">Start Voting</button>
            </div>
        </div>
      </div>
  )
}

module.exports = Card
