import { useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TRAIN_LINE_COLOR } from 'utils/constants'
import { TrainLineDirection, TrainLineColorName } from 'types/Train.types'
import useSelectCoordComponent from 'hooks/useSelectCoordComponent'

type TrainLineProps = {
  nodeNumber: number
  color: TrainLineColorName
  direction: TrainLineDirection | null
  isHighlighted: boolean
}

const TrainLine: FunctionComponent<TrainLineProps> = function ({
  nodeNumber,
  color,
  direction,
  isHighlighted,
}) {
  if (direction === null) return null

  const trainLineRef = useRef<HTMLDivElement | null>(null)
  useSelectCoordComponent('line', trainLineRef, nodeNumber, direction)

  console.log(isHighlighted)

  return (
    <div
      css={trainLineStyle(color, direction, isHighlighted)}
      ref={trainLineRef}
    />
  )
}

const RORATE_DEG_BY_DIRECTION = {
  top: '0',
  right: '90',
  bottom: '180',
  left: '270',
}

const trainLineStyle = (
  color: TrainLineColorName,
  direction: TrainLineDirection,
  isHighlighted: boolean,
) => css`
  position: absolute;
  bottom: calc(50% - 5px);
  left: calc(50% - 5px);
  z-index: ${isHighlighted ? '25' : '5'};

  width: 10px;
  height: 130px;
  background: ${TRAIN_LINE_COLOR[color]};
  border-radius: 5px;
  transform-origin: 50% 125px;
  transform: rotate(${RORATE_DEG_BY_DIRECTION[direction]}deg);
`

export default TrainLine
