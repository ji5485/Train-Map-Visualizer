import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import produce from 'immer'
import { TrainLineItemType } from 'types/Train.types'
import { useManageTrainLineItem } from 'state/Train/TrainLineItemState'
import TrainLineItem from 'components/ManageTrainLineItem/TrainLineItem'

const TrainLineItemList: FunctionComponent = function () {
  const { trainLineItem, setTrainLineItem } = useManageTrainLineItem()

  const moveTrainLineItem = (dragIndex: number, hoverIndex: number) => {
    const selectedTrainLineItem: TrainLineItemType = trainLineItem[dragIndex]

    setTrainLineItem(prev =>
      produce(prev, draft => {
        draft.splice(dragIndex, 1)
        draft.splice(hoverIndex, 0, selectedTrainLineItem)

        return draft
      }),
    )
  }

  return (
    <div css={trainLineItemListStyle}>
      {trainLineItem.length !== 0
        ? trainLineItem.map(
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
          )
        : 'None'}
    </div>
  )
}

const trainLineItemListStyle = css``

export default TrainLineItemList
