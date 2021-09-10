import { useRef, FunctionComponent, MutableRefObject } from 'react'
import { jsx, css } from '@emotion/react'
import { GrDrag } from 'react-icons/gr'
import { IoIosArrowDown } from 'react-icons/io'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { TrainLineColorName } from 'types/Train.types'
import { TRAIN_LINE_COLOR } from 'utils/constants'

type TrainLineItemProps = {
  name: string
  color: TrainLineColorName
  index: number
  findTrainLineItemIndex: (id: string) => number
  moveTrainLineItem: (dragIndex: number, hoverIndex: number) => void
}

const TrainLineItem: FunctionComponent<TrainLineItemProps> = function ({
  name,
  color,
  index,
  findTrainLineItemIndex,
  moveTrainLineItem,
}) {
  const itemRef = useRef<MutableRefObject | null>(null)

  const [, drop] = useDrop({
    accept: 'TrainLineItem',
  })

  return (
    <div css={trainLineItemStyle}>
      <GrDrag />
      <div css={trainColorBoxStyle(color)} />
      {name}
      <IoIosArrowDown css={trainLineItemFormHandlerStyle} />
    </div>
  )
}

const trainLineItemStyle = css`
  display: flex;
  align-items: center;
  height: 50px;
`

const trainColorBoxStyle = (color: TrainLineColorName) => css`
  width: 20px;
  height: 20px;
  margin: 0 10px;
  border-radius: 5px;
  background: ${TRAIN_LINE_COLOR[color]};
`

const trainLineItemFormHandlerStyle = css`
  margin-left: auto;
  font-size: 1.3rem;
  cursor: pointer;
`

export default TrainLineItem
