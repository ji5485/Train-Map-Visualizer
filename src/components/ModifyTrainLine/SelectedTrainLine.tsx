import { FunctionComponent } from 'react'
import { css } from '@emotion/react'
import {
  TrainLineType,
  TrainPlatformType,
  TrainLineColorName,
} from '../../types/Train.types'
import { TRAIN_LINE_COLOR } from '../../utils/constants'
import ConnectedTrainPlatformItem from '../ModifyTrainLine/ConnectedTrainPlatformItem'

type SelectedTrainLineProps = {
  selectedTrainLine: TrainLineType
  connectedTrainPlatform: TrainPlatformType[]
}

const SelectedTrainLine: FunctionComponent<SelectedTrainLineProps> = function ({
  selectedTrainLine: { color },
  connectedTrainPlatform,
}) {
  return (
    <div>
      <div css={selectedTrainLineTitleStyle}>선로 정보</div>
      <div css={selectedTrainLineStyle}>
        <ConnectedTrainPlatformItem trainPlatform={connectedTrainPlatform[0]} />
        <div css={trainLineItemStyle(color)} />
        <ConnectedTrainPlatformItem trainPlatform={connectedTrainPlatform[1]} />
      </div>
    </div>
  )
}

const selectedTrainLineTitleStyle = css`
  margin-bottom: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
`

const selectedTrainLineStyle = css`
  display: grid;
  grid-template-columns: 40% 1fr 40%;
  align-items: center;
`

const trainLineItemStyle = (color: TrainLineColorName) => css`
  height: 8px;
  background: ${TRAIN_LINE_COLOR[color]};
`

export default SelectedTrainLine
