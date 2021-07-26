import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainLine } from 'state/Train/trainLineState'
import useGetPositionByNodeNumber from 'hooks/useGetPositionByNodeNumber'
import useHandleClickOutSide from 'hooks/useHandleClickOutSide'
import { TrainLineItemType, TrainLineColorName } from 'types/Train.types'
import { GrAdd } from 'react-icons/gr'
import TrainLineItemButton from 'components/SelectTrainPlatform/TrainLineItemButton'
import AppendTrainLineItemList from 'components/SelectTrainPlatform/AppendTrainLineItemList'

type TrainLineItemFormProps = {
  line: TrainLineItemType[]
  nodeNumber: number
}

const TrainLineItemForm: FunctionComponent<TrainLineItemFormProps> = function ({
  line,
  nodeNumber,
}) {
  const { nextNodeNumber } = useGetPositionByNodeNumber(nodeNumber)
  const trainLineMatrix = useGetTrainLine()
  const {
    ref,
    isVisible,
    showComponent,
    hideComponent,
  } = useHandleClickOutSide()

  const checkTrainLineItemIsNotUsed = (color: TrainLineColorName) =>
    Object.values(nextNodeNumber).every((next: number) => {
      const trainLine = trainLineMatrix[nodeNumber][next]
      return trainLine === null ? true : trainLine.color !== color
    })

  const removeTrainLine = () => {
    console.log('abc', nodeNumber)
  }

  const appendTrainLine = () => {
    showComponent()
    console.log('abc', hideComponent)
  }

  return (
    <div css={trainLineItemFormStyle}>
      {line.map(({ id, name, color }) => {
        const canRemove = line.length > 1 && checkTrainLineItemIsNotUsed(color)

        return (
          <TrainLineItemButton
            name={name}
            color={color}
            canRemove={canRemove}
            removeTrainLine={removeTrainLine}
            key={id}
          />
        )
      })}

      <div css={appendLineButtonStyle} onClick={appendTrainLine}>
        <GrAdd />
        {isVisible ? <AppendTrainLineItemList line={line} ref={ref} /> : null}
      </div>
    </div>
  )
}

const trainLineItemFormStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
  grid-gap: 10px;
`

const appendLineButtonStyle = css`
  position: relative;
  display: grid;
  place-items: center;
  border: 3px dashed #adb5bd;
  border-radius: 5px;
  color: #adb5bd;
  cursor: pointer;
  transition: 0.15s border-color;

  &:hover {
    border-color: #495057;
  }
`

export default TrainLineItemForm
