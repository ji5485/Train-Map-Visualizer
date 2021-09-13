import { useState, useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { GrDrag } from 'react-icons/gr'
import { IoIosArrowDown } from 'react-icons/io'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import { TrainLineColorName } from 'types/Train.types'
import { TRAIN_LINE_COLOR } from 'utils/constants'
import ModifyTrainLineItem from 'components/ManageTrainLineItem/ModifyTrainLineItem'

type TrainLineItemProps = {
  id: string
  name: string
  color: TrainLineColorName
  index: number
  moveTrainLineItem: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
}

const DRAG_ITEM_TYPE = 'TrainLineItem'

const TrainLineItem: FunctionComponent<TrainLineItemProps> = function ({
  id,
  name,
  color,
  index,
  moveTrainLineItem,
}) {
  const itemRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleToggleVisible = () => setIsVisible(prev => !prev)

  const [{ isDragging }, drag, preview] = useDrag({
    type: DRAG_ITEM_TYPE,
    item: { id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: DRAG_ITEM_TYPE,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!itemRef.current) return

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      const { top, bottom } = itemRef.current?.getBoundingClientRect()

      const hoverMiddleY = (bottom - top) / 2
      const hoverClientY = monitor.getClientOffset()!.y - top

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      )
        return

      moveTrainLineItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  drop(preview(itemRef))

  return (
    <div style={{ opacity: isDragging ? '0.5' : '1' }} ref={itemRef}>
      <div css={trainLineItemStyle}>
        <div css={trainLineItemDragBoxStyle} ref={ref => drag(ref)}>
          <GrDrag />
        </div>
        <div css={trainColorBoxStyle(color)} />
        {name}
        <IoIosArrowDown
          css={trainLineItemFormHandlerStyle(isVisible)}
          onClick={handleToggleVisible}
        />
      </div>

      {isVisible ? <ModifyTrainLineItem /> : null}
    </div>
  )
}

const trainLineItemStyle = css`
  display: flex;
  align-items: center;
  height: 50px;
`

const trainLineItemDragBoxStyle = css`
  display: grid;
  place-items: center;
  cursor: grab;
`

const trainColorBoxStyle = (color: TrainLineColorName) => css`
  width: 20px;
  height: 20px;
  margin: 0 10px;
  border-radius: 5px;
  background: ${TRAIN_LINE_COLOR[color]};
`

const trainLineItemFormHandlerStyle = (isVisible: boolean) => css`
  margin-left: auto;
  font-size: 1.3rem;
  cursor: pointer;
  transform: rotate(${isVisible ? '180deg' : '0'});
  transition: 0.3s transform;
`

export default TrainLineItem
