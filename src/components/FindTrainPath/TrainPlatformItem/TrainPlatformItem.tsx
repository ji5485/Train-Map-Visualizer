import { createElement, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainLineItemType } from 'types/Train.types'
import {
  TRAIN_LINE_COLOR,
  TRAIN_LINE_ITEM_ICON,
  TRANSFER_TRAIN_PLATFORM_COLOR,
} from 'utils/constants'

type TrainPlatformItemProps = {
  name: string
  line: TrainLineItemType[]
  iconType: 'check' | 'cancel'
  onClick: () => void
}

const TrainPlatformItem: FunctionComponent<TrainPlatformItemProps> = function ({
  name,
  line,
  iconType,
  onClick,
}) {
  const { component, color: iconColor } = TRAIN_LINE_ITEM_ICON[iconType]
  const trainPlatformColor =
    line.length === 1
      ? TRAIN_LINE_COLOR[line[0].color]
      : TRANSFER_TRAIN_PLATFORM_COLOR

  return (
    <div css={trainPlatformItemStyle}>
      <div css={trainColorBoxStyle(trainPlatformColor)} />
      {name}
      {createElement(component, { style: buttonStyle(iconColor), onClick })}
    </div>
  )
}

const trainPlatformItemStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 15px;
`

const trainColorBoxStyle = (background: string) => css`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 5px;
  background: ${background};
`

const buttonStyle = (color: string) => ({
  marginLeft: 'auto',
  fontSize: '1.3rem',
  cursor: 'pointer',
  color,
})

export default TrainPlatformItem
