import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import TRAIN_LINE_COLOR from 'utils/trainLineColor'
import { MdClose } from 'react-icons/md'

type TrainLineItemProps = {
  name: string
  color: keyof typeof TRAIN_LINE_COLOR
}

const TrainLineItem: FunctionComponent<TrainLineItemProps> = function ({
  name,
  color,
}) {
  return (
    <div css={trainLineItemStyle}>
      <div css={trainColorBoxStyle(TRAIN_LINE_COLOR[color])} />
      {name}
      <MdClose css={cancelButtonStyle} />
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

const cancelButtonStyle = css`
  margin-left: auto;
  font-size: 1.3rem;
  color: #fa5252;
  cursor: pointer;
`

export default TrainLineItem
