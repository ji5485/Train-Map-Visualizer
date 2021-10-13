import { FunctionComponent } from 'react'
import { css } from '@emotion/react'
import produce from 'immer'
import { TrainLineItemType } from '../../types/Train.types'
import { useManageTrainLineItem } from '../../state/Train/TrainLineItemState'
import TrainLineItem from '../ManageTrainLineItem/TrainLineItem'

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

  if (trainLineItem.length === 0)
    return (
      <div css={emptyTrainLineItemStyle}>
        사용 가능한 노선이 존재하지 않습니다.
        <br />
        하단 폼에서 노선을 추가해주세요.
      </div>
    )

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

const emptyTrainLineItemStyle = css`
  font-size: 0.9rem;
  font-weight: 700;
  text-align: center;
`

export default TrainLineItemList
