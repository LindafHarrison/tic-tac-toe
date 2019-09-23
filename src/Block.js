import React from 'react';
import { Col } from 'react-flexbox-grid';

const Block = ({ move, positionClass, select, yAxis, xAxis }) => {
  let className = positionClass ? `block ${positionClass}` : 'block'

  return (
    <Col className={className} lg={4} onClick={() => select(yAxis, xAxis)}>
      {move}
    </Col>
  )
}

export default Block