import { useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainLineColorHexByName } from 'state/Train/trainLineColorState'
import { TrainLineDirection, TrainLineColorName } from 'types/Train.types'
import useSelectCoordComponent from 'hooks/useSelectCoordComponent'

type TrainLineProps = {
  nodeNumber: number
  color: TrainLineColorName
  direction: TrainLineDirection | null
}

const TrainLine: FunctionComponent<TrainLineProps> = function ({
  nodeNumber,
  color,
  direction,
}) {
  if (direction === null) return null

  const trainLineRef = useRef<HTMLDivElement | null>(null)
  const colorHex = useGetTrainLineColorHexByName(color)
  useSelectCoordComponent('line', trainLineRef, nodeNumber, direction)

  return <div css={trainLineStyle(colorHex, direction)} ref={trainLineRef} />
}

const RORATE_DEG_BY_DIRECTION = {
  top: '0',
  right: '90',
  bottom: '180',
  left: '270',
}

const trainLineStyle = (color: string, direction: TrainLineDirection) => css`
  position: absolute;
  bottom: calc(50% - 5px);
  left: calc(50% - 5px);
  z-index: 5;

  width: 10px;
  height: 130px;
  background: ${color};
  border-radius: 5px;
  transform-origin: 50% 125px;
  transform: rotate(${RORATE_DEG_BY_DIRECTION[direction]}deg);
`

export default TrainLine
