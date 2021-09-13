import { FunctionComponent } from 'react'
import produce from 'immer'
import { TrainLineItemType } from 'types/Train.types'
import { useManageTrainLineItem } from 'state/Train/TrainLineItemState'
import TrainLineItem from 'components/ManageTrainLineItem/TrainLineItem'

const TrainLineItemList: FunctionComponent = function () {
  const { trainLineItem, setTrainLineItem } = useManageTrainLineItem()

  const moveTrainLineItem = (dragIndex: number, hoverIndex: number) =>
    setTrainLineItem(prev =>
      produce(prev, draft => {
        const selectedTrainLineItem: TrainLineItemType = draft[dragIndex]

        draft.splice(dragIndex, 1)
        draft.splice(hoverIndex, 0, selectedTrainLineItem)

        return draft
      }),
    )

  if (trainLineItem.length === 0) return null

  return (
    <div>
      {trainLineItem.map(
        ({ id, name, color }: TrainLineItemType, index: number) => (
          <TrainLineItem
            id={id}
            name={name}
            color={color}
            index={index}
            moveTrainLineItem={moveTrainLineItem}
            key={id}
          />
        ),
      )}
    </div>
  )
}

export default TrainLineItemList
