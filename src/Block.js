import React from 'react';
import { Col } from 'react-flexbox-grid';

const Block = ({ move, positionClass, gameLogic, yAxis, xAxis }) => {
  let className = positionClass ? `block ${positionClass}` : 'block'

  return (
    <Col className={className} lg={4} onClick={() => gameLogic(yAxis, xAxis)}>
      {move}
    </Col>
  )
}

export default Block