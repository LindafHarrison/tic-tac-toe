import React, { Component } from 'react'

class Score extends Component {
  render() {
    let score = this.props.score
    return (
      <div className='score'>
        <p>Score: </p>
        <p>X has {score.X}</p>
        <p>O has {score.O} </p>
      </div>
    )
  }
}

export default Score