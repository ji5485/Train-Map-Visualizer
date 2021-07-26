import { forwardRef } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainLineList } from 'state/Train/trainLineListState'
import { TrainLineItemType } from 'types/Train.types'

type AppendTrainLineItemListProps = {
  line: TrainLineItemType[]
}

const AppendTrainLineItemList = forwardRef<
  HTMLDivElement,
  AppendTrainLineItemListProps
>(({ line }, ref) => {
  const trainLineList = useGetTrainLineList()
  const filteredTrainLineList = trainLineList.filter(
    lineItem => !line.find(({ id }) => id === lineItem.id),
  )

  // TODO: 선택 가능한 아이템 띄워주기
  console.log(filteredTrainLineList)

  return (
    <div css={appendTrainLineItemListStyle} ref={ref}>
      abc
    </div>
  )
})

const appendTrainLineItemListStyle = css`
  position: absolute;
  top: 45px;
  left: -3px;
  width: 120px;
  padding: 3px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
`

export default AppendTrainLineItemList
