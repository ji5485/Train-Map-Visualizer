import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'

// type LineDirectionType = 'vertical' | 'horizontal'
type LineDirectionType = 'top' | 'right' | 'bottom' | 'left'

type TrainLineProps = {
  direction: LineDirectionType
}

const TrainLine: FunctionComponent<TrainLineProps> = function ({ direction }) {
  return <div css={trainLineStyle(direction)} />
}

const RORATE_DEG_BY_DIRECTION = {
  top: '0',
  right: '90',
  bottom: '180',
  left: '270',
}

const trainLineStyle = (direction: LineDirectionType) => css`
  position: absolute;
  bottom: calc(50% - 10px);
  left: calc(50% - 10px);
  z-index: 5;

  width: 20px;
  height: 140px;
  background: lightgrey;
  border-radius: 10px;
  transform-origin: 50% 130px;
  transform: rotate(${RORATE_DEG_BY_DIRECTION[direction]}deg);
`

// const lineStyle = (
//   direction: LineDirectionType,
//   position: LinePositionType,
// ) => css`
//   position: absolute;
//   ${direction === 'vertical' ? 'left' : 'top'}: 50%;
//   ${position}: calc(50% - 10px);
//   transform: ${direction === 'vertical'
//     ? 'translateX(-50%)'
//     : 'translateY(-50%)'};

//   width: ${direction === 'vertical' ? '20' : '140'}px;
//   height: ${direction === 'vertical' ? '140' : '20'}px;
//   border-radius: 10px;
//   background: lightgrey;
// `

export default TrainLine
