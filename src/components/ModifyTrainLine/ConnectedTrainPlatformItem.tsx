import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainPlatformType } from 'types/Train.types'
import {
  TRANSFER_TRAIN_PLATFORM_COLOR,
  TRAIN_LINE_COLOR,
} from 'utils/constants'

type ConnectedTrainPlatformItemProps = {
  trainPlatform: TrainPlatformType
}

const ConnectedTrainPlatformItem: FunctionComponent<ConnectedTrainPlatformItemProps> =
  function ({ trainPlatform: { name, line } }) {
    const color =
      line.length > 1
        ? TRANSFER_TRAIN_PLATFORM_COLOR
        : TRAIN_LINE_COLOR[line[0].color]

    return (
      <div css={connectedTrainPlatformItemStyle(color)}>
        <div css={connectedTrainPlatformContentStyle}>
          <div css={connectedTrainPlatformLineStyle(color)}>
            {line.length > 1 ? '환승역' : line[0].name}
          </div>
          <div css={connectedTrainPlatformNameStyle}>{name}</div>
        </div>
      </div>
    )
  }

const connectedTrainPlatformItemStyle = (color: string) => css`
  display: grid;
  place-items: center;
  height: 40px;
  padding: 3px;
  border-radius: 15px;
  background: ${color};
`

const connectedTrainPlatformContentStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 13px;
  background: #ffffff;
`

const connectedTrainPlatformLineStyle = (color: string) => css`
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${color};
  font-size: 0.5rem;
  font-weight: 800;
  color: #ffffff;
  text-align: center;
`

const connectedTrainPlatformNameStyle = css`
  margin-left: 5px;
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 0.85;
`

export default ConnectedTrainPlatformItem
