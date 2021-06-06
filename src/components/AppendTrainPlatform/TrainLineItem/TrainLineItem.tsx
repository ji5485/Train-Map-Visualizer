import { createElement, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import {
  TrainLineColorName,
  useGetTrainLineColor,
} from 'state/train/trainLineColorState'
import { AiOutlineCheck } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import { GrAdd } from 'react-icons/gr'

type TrainLineItemProps = {
  name: string
  color: TrainLineColorName
  iconType: 'check' | 'cancel' | 'append'
  onClick: () => void
}

const TRAIN_LINE_ITEM_ICON = {
  check: {
    component: AiOutlineCheck,
    color: '#40c057',
  },
  cancel: {
    component: MdClose,
    color: '#fa5252',
  },
  append: {
    component: GrAdd,
    color: '#000000',
  },
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
