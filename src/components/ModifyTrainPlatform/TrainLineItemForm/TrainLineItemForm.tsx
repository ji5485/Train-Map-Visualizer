import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainLine } from 'state/Train/trainLineState'
import { useGetFilteredTrainLineList } from 'state/Train/trainLineListState'
import { useStateSelectTrainPlatformForm } from 'state/FloatingForm/SelectTrainPlatformFormState'
import useGetPositionByNodeNumber from 'hooks/useGetPositionByNodeNumber'
import { TrainLineColorName } from 'types/Train.types'
import TrainLineItemButton from 'components/ModifyTrainPlatform/TrainLineItemButton'
import AppendTrainLineItem from 'components/ModifyTrainPlatform/AppendTrainLineItem'

const TrainLineItemForm: FunctionComponent = function () {
  const [
    { line, nodeNumber },
    setSelectTrainPlatformForm,
  ] = useStateSelectTrainPlatformForm()
  const { nextNodeNumber } = useGetPositionByNodeNumber(nodeNumber)
  const trainLineMatrix = useGetTrainLine()

  const filteredTrainLine = useGetFilteredTrainLineList(
    line.map(({ name }) => name),
  )

  const checkTrainLineItemIsNotUsed = (color: TrainLineColorName) =>
    Object.values(nextNodeNumber).every((next: number) => {
      const trainLine = trainLineMatrix[nodeNumber][next]
      return trainLine === null ? true : trainLine.color !== color
    })

  const removeTrainLine = (lineId: string) =>
    setSelectTrainPlatformForm(({ line, ...rest }) => {
      const modifiedList = line.filter(({ id }) => id !== lineId)

      return {
        line: modifiedList,
        ...rest,
      }
    })

  return (
    <div css={trainLineItemFormStyle}>
      {line.map(({ id, name, color }) => {
        const canRemove = line.length > 1 && checkTrainLineItemIsNotUsed(color)

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
  )
}

const trainLineItemFormStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
  grid-gap: 10px;
`

export default TrainLineItemForm
