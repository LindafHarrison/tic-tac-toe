import React, { Component } from 'react';
import Board from './Board'
import Score from './Score'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState()
    this.gameLogic = this.gameLogic.bind(this)
  }

  getInitialState() {
    return {
      playersTurn: 'X',
      position: {
        top: { left: null, middle: null, right: null },
        middle: { left: null, middle: null, right: null },
        bottom: { left: null, middle: null, right: null }
      },
      streaks: {
        yAxis: {
          top: { streak: 0, player: null, bust: false },
          middle: { streak: 0, player: null, bust: false },
          bottom: { streak: 0, player: null, bust: false }
        },
        xAxis: {
          left: { streak: 0, player: null, bust: false },
          middle: { streak: 0, player: null, bust: false },
          right: { streak: 0, player: null, bust: false }
        },
        diagonal: {
          topLeft: { streak: 0, player: null, bust: false },
          topRight: { streak: 0, player: null, bust: false }
        }
      },
      bust: {
        count: 0,
      },
      score: { X: 0, O: 0 },
      win: false
    }
  }

  gameLogic(yAxis, xAxis) {
    if (this.state.position[yAxis][xAxis] !== null) alert('This block has already been played, please gameLogic another one')
    else {
      let updatedPosition = { ...this.state.position }
      let updatedBust = { ...this.state.bust }

      let currentPlayer = this.state.playersTurn
      updatedPosition[yAxis][xAxis] = currentPlayer
      let turn = this.state.playersTurn === 'X' ? 'O' : 'X'
      let updateStreaks = { ...this.state.streaks }
      let updateStreaksFunc = () => {
        let streakPlayer = updateStreaks.yAxis[yAxis].player

        const yAxisFunc = (() => {
          if (updateStreaks.yAxis[yAxis].bust === false && (streakPlayer === null || streakPlayer === currentPlayer)) {
            updateStreaks.yAxis[yAxis].streak++
            updateStreaks.yAxis[yAxis].player = currentPlayer
          } else {
            let bust = updateStreaks.yAxis[yAxis].bust
            if (bust !== true) {
              bust = true
              updatedBust.count++
            }
          }
        })()

        const xAxisFunc = (() => {
          streakPlayer = updateStreaks.xAxis[xAxis].player

          if (updateStreaks.xAxis[xAxis].bust === false && (updateStreaks.xAxis[xAxis].player === null || streakPlayer === currentPlayer)) {
            updateStreaks.xAxis[xAxis].streak++
            updateStreaks.xAxis[xAxis].player = currentPlayer
          } else {
            let bust = updateStreaks.xAxis[xAxis].bust
            if (bust !== true) {
              bust = true
              updatedBust.count++
            }
          }
        })()


        const diagonalFunc = (() => {
          if ((yAxis === 'top' && xAxis === 'left') || (yAxis === 'middle' && xAxis === 'middle') || (yAxis === 'bottom' && xAxis === 'right')) {
            let current = updateStreaks.diagonal.topLeft
            if (current.bust === false && (current.player === null || current.player === currentPlayer)) {
              current.streak++
              current.player = currentPlayer
            } else {
              if (current.bust !== true) {
                current.bust = true
                updatedBust.count++
              }
            }
          }

          if ((yAxis === 'top' && xAxis === 'right') || (yAxis === 'middle' && xAxis === 'middle') || (yAxis === 'bottom' && xAxis === 'left')) {
            let current = updateStreaks.diagonal.topRight
            if (current.bust === false && (current.player === null || current.player === currentPlayer)) {
              current.streak++
              current.player = currentPlayer
            } else {
              if (current.bust !== true) {
                current.bust = true
                updatedBust.count++
              }
            }
          }
        })()

      }
      updateStreaksFunc()
      this.setState({
        position: updatedPosition,
        playersTurn: turn,
        bust: updatedBust
      })

      if (updateStreaks.yAxis[yAxis].streak === 3 || updateStreaks.xAxis[xAxis].streak === 3 || updateStreaks.diagonal.topLeft.streak === 3 || updateStreaks.diagonal.topRight.streak === 3) {
        let score = { ...this.state.score }
        score[currentPlayer]++
        this.setState({
          score: score,
          win: true
        })
      }

    }
    return
  }

  componentDidUpdate() {
    let bust = this.state.bust.count
    let resetGame = () => {
      let initialState = { ...this.getInitialState() }
      initialState.score = this.state.score
      initialState.playersTurn = this.state.playersTurn
      this.setState(initialState)
    }

    if (bust === 8) {
      alert("it's a TIE")
      resetGame()
    }

    if (this.state.win) {
      alert("WINNER WINNER WINNER, you WON!!! :)")
      resetGame()
    }
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <p>
            Tic Tac Toe
          </p>
          <p>
            Player {this.state.playersTurn}'s turn
          </p>
          <Score score={this.state.score} />
          <Board position={this.state.position} gameLogic={this.gameLogic} />
        </header>
      </div>
    )
  }
}

export default App;
