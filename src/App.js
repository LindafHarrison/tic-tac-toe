import React, { Component } from 'react';
import Board from './Board'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        yAxis: 0,
        xAxis: 0,
        diagonal: 0,
        allOptions: 0
      },
      score: { X: 0, O: 0 }
    }
    this.select = this.select.bind(this)
  }

  select(yAxis, xAxis) {
    if (this.state.position[yAxis][xAxis] !== null) alert('This block has already been played, please select another one')
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
              updatedBust.yAxis++
              if (updatedBust.yAxis === 3) {
                updatedBust.allOptions++
              }
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
              updatedBust.xAxis++
              if (updatedBust.xAxis === 3) {
                updatedBust.allOptions++
              }
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
                updatedBust.diagonal++
                if (updatedBust.diagonal === 2) {
                  updatedBust.allOptions++
                }
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
                updatedBust.diagonal++
                if (updatedBust.diagonal === 2) {
                  updatedBust.allOptions++
                }
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

      console.log('bust: ', updatedBust)
      let resetGame = () => {
        this.setState({
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
            yAxis: 0,
            xAxis: 0,
            diagonal: 0,
            allOptions: 0
          }
        })
      }
      // componentDidUpdate() {
      if (updatedBust.allOptions === 3) {
        alert("it's a TIE")
        resetGame()
      }

      if (updateStreaks.yAxis[yAxis].streak === 3 || updateStreaks.xAxis[xAxis].streak === 3 || updateStreaks.diagonal.topLeft.streak === 3 || updateStreaks.diagonal.topRight.streak === 3) {
        alert("WINNER WINNER WINNER, you WON!!! :)")
        let score = { ...this.state.score }
        score[currentPlayer]++
        this.setState({
          score: score
        })
        resetGame()
      }
      // }
    }
    return
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
          <div className='score'>
            <p>Score: </p>
            <p>X has {this.state.score.X}</p>
            <p>O has {this.state.score.O} </p>
          </div>
          <Board position={this.state.position} select={this.select} />
        </header>
      </div>
    )
  }
}

export default App;
