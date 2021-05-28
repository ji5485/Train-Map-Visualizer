import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import TRAIN_LINE_COLOR from 'utils/trainLineColor'
import { MdClose } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'

type TrainLineItemProps = {
  name: string
  color: keyof typeof TRAIN_LINE_COLOR
  iconType: 'check' | 'cancel'
  onClick: () => void
}

const TrainLineItem: FunctionComponent<TrainLineItemProps> = function ({
  name,
  color,
  iconType,
  onClick,
}) {
  return (
    <div css={trainLineItemStyle}>
      <div css={trainColorBoxStyle(TRAIN_LINE_COLOR[color])} />
      {name}
      {iconType === 'check' ? (
        <AiOutlineCheck css={checkButtonStyle} onClick={onClick} />
      ) : (
        <MdClose css={cancelButtonStyle} onClick={onClick} />
      )}
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

const checkButtonStyle = css`
  margin-left: auto;
  font-size: 1.3rem;
  color: #40c057;
  cursor: pointer;
`

const cancelButtonStyle = css`
  margin-left: auto;
  font-size: 1.3rem;
  color: #fa5252;
  cursor: pointer;
`

export default TrainLineItem
