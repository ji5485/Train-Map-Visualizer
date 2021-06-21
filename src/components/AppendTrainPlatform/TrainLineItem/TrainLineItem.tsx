import { createElement, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TRAIN_LINE_ITEM_ICON } from 'utils/constants'
import { useGetTrainLineColor } from 'state/Train/trainLineColorState'
import { TrainLineColorName } from 'types/Train.types'

type TrainLineItemProps = {
  name: string
  color: TrainLineColorName
  iconType: 'check' | 'cancel' | 'append'
  onClick: () => void
}

const TrainLineItem: FunctionComponent<TrainLineItemProps> = function ({
  name,
  color,
  iconType,
  onClick,
}) {
  const trainLineColor = useGetTrainLineColor()
  const { component, color: iconColor } = TRAIN_LINE_ITEM_ICON[iconType]

  return (
    <div css={trainLineItemStyle}>
      <div css={trainColorBoxStyle(trainLineColor[color])} />
      {name}
      {createElement(component, { style: buttonStyle(iconColor), onClick })}
    </div>
  )
}

const trainLineItemStyle = css`
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

export default TrainLineItem
