import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import {
  TrainLineColorName,
  useGetTrainLineColorHexByName,
} from 'state/train/trainLineColorState'
import { TrainLineDirection } from 'state/train/trainLineState'

type TrainLineProps = {
  color: TrainLineColorName
  direction: TrainLineDirection | null
}

const TrainLine: FunctionComponent<TrainLineProps> = function ({
  color,
  direction,
}) {
  if (direction === null) return null

  const colorHex = useGetTrainLineColorHexByName(color)

  return <div css={trainLineStyle(colorHex, direction)} />
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
