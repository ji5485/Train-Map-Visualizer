import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useManageTrainLine } from 'state/Train/TrainMapState'
import { useGetFilteredTrainLineItem } from 'state/Train/TrainLineItemState'
import { useManageModifyTrainPlatformForm } from 'state/FloatingForm/ModifyTrainPlatformState'
import useGetPositionByNodeNumber from 'hooks/useGetPositionByNodeNumber'
import { TrainLineColorName } from 'types/Train.types'
import TrainLineItemButton from 'components/ModifyTrainPlatform/TrainLineItemButton'
import AppendTrainLineItem from 'components/ModifyTrainPlatform/AppendTrainLineItem'

const TrainLineItemForm: FunctionComponent = function () {
  const {
    modifyTrainPlatformForm: { line, nodeNumber },
    setModifyTrainPlatformForm,
  } = useManageModifyTrainPlatformForm()
  const { nextNodeNumber } = useGetPositionByNodeNumber(nodeNumber)
  const { trainLineMatrix } = useManageTrainLine()

  const filteredTrainLine = useGetFilteredTrainLineItem(
    line.map(({ name }) => name),
  )

  const checkTrainLineItemIsNotUsed = (color: TrainLineColorName) =>
    Object.values(nextNodeNumber).every((next: number) => {
      const trainLine = trainLineMatrix[nodeNumber][next]
      return trainLine === null ? true : trainLine.color !== color
    })

  const removeTrainLine = (lineId: string) =>
    setModifyTrainPlatformForm(({ line, ...rest }) => {
      const modifiedList = line.filter(({ id }) => id !== lineId)

      return {
        line: modifiedList,
        ...rest,
      }
    })

  return (
    <div>
      <div css={trainLineItemFormTitleStyle}>호선 변경</div>

      <div css={trainLineItemFormStyle}>
        {line.map(({ id, name, color }) => {
          const canRemove =
            line.length > 1 && checkTrainLineItemIsNotUsed(color)

          return (
            <TrainLineItemButton
              id={id}
              name={name}
              color={color}
              canRemove={canRemove}
              removeTrainLine={removeTrainLine}
              key={id}
            />
          )
        })}

        {filteredTrainLine.length !== 0 ? (
          <AppendTrainLineItem line={filteredTrainLine} />
        ) : null}
      </div>
    </div>
  )
}

const trainLineItemFormTitleStyle = css`
  margin-bottom: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
`

const trainLineItemFormStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
  grid-gap: 10px;
`

export default TrainLineItemForm
