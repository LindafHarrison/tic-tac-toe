import React, { Component } from 'react'
import Block from './Block'
import { Grid, Row } from 'react-flexbox-grid';

class Board extends Component {
  render() {
    let position = this.props.position
    return (
      <Grid>
        <Row middle="lg">
          <Block select={this.props.select} move={position.top.left} yAxis='top' xAxis='left' />
          <Block select={this.props.select} positionClass='top' move={position.top.middle} yAxis='top' xAxis='middle' />
          <Block select={this.props.select} move={position.top.right} yAxis='top' xAxis='right' />
        </Row>
        <Row middle="lg">
          <Block select={this.props.select} positionClass='side' move={position.middle.left} yAxis='middle' xAxis='left' />
          <Block select={this.props.select} positionClass='inner' move={position.middle.middle} yAxis='middle' xAxis='middle' />
          <Block select={this.props.select} positionClass='side' move={position.middle.right} yAxis='middle' xAxis='right' />
        </Row>
        <Row middle="lg">
          <Block select={this.props.select} move={position.bottom.left} yAxis='bottom' xAxis='left' />
          <Block select={this.props.select} positionClass="bottom" move={position.bottom.middle} yAxis='bottom' xAxis='middle' />
          <Block select={this.props.select} move={position.bottom.right} yAxis='bottom' xAxis='right' />
        </Row>
      </Grid>
    )
  }
}

export default Board