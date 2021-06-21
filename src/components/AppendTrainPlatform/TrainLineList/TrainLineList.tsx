import { FunctionComponent, Dispatch, SetStateAction } from 'react'
import { jsx, css } from '@emotion/react'
import useVisibleNewTrainLineItem from 'hooks/useVisibleNewTrainLineItem'
import useManageTrainLine from 'hooks/useManageTrainLineList'
import { useGetFilteredTrainLineList } from 'state/Train/trainLineListState'
import { useSetTrainForm } from 'state/SideBar/trainFormState'
import TrainLineItem from 'components/AppendTrainPlatform/TrainLineItem'
import { TrainLineItemType } from 'types/Train.types'

type TrainLineListProps = {
  trainLineName: string
  setTrainLineName: Dispatch<SetStateAction<string>>
  setSelectorIsVisible: Dispatch<SetStateAction<boolean>>
}

const TrainLineList: FunctionComponent<TrainLineListProps> = function ({
  trainLineName,
  setTrainLineName,
  setSelectorIsVisible,
}) {
  const setTrainForm = useSetTrainForm()
  const trainLine = useGetFilteredTrainLineList(trainLineName)
  const { newTrainLineColor, newTrainLineVisible } = useVisibleNewTrainLineItem(
    trainLine,
    trainLineName,
  )
  const { createTrainLine, getTrainLineItemById } = useManageTrainLine()

  const selectTrainLine = (selectedLineId: string) => () => {
    const selectedTrainLine = getTrainLineItemById(selectedLineId)
    if (selectedTrainLine === undefined) return

    setTrainForm(prev => ({ ...prev, selectedTrainLine }))
    setTrainLineName('')
    setSelectorIsVisible(false)
  }
  const appendTrainLine = () => {
    const newTrainLine = createTrainLine(trainLineName, newTrainLineColor)
    setTrainForm(prev => ({
      ...prev,
      selectedTrainLine: newTrainLine,
    }))
    setTrainLineName('')
    setSelectorIsVisible(false)
  }

  if (trainLine.length === 0 && trainLineName === '')
    return <div css={emptyTrainLine}>호선을 새로 추가해주세요.</div>

  return (
    <div css={trainLineListStyle}>
      {trainLine.map(({ id, name, color }: TrainLineItemType) => (
        <TrainLineItem
          name={name}
          color={color}
          iconType="check"
          onClick={selectTrainLine(id)}
          key={id}
        />
      ))}

      {newTrainLineVisible && (
        <div css={appendTrainLineStyle}>
          <TrainLineItem
            name={trainLineName}
            color={newTrainLineColor}
            iconType="append"
            onClick={appendTrainLine}
          />
        </div>
      )}
    </div>
  )
}

const trainLineListStyle = css`
  position: absolute;
  top: 50px;
  left: 0px;

  overflow-y: auto;
  width: 100%;
  max-height: 200px;
  background: #f8f9fa;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
  }
`

const emptyTrainLine = css`
  position: absolute;
  top: 50px;
  left: 0px;

  display: grid;
  place-items: center;

  width: 100%;
  height: 100px;
  background: #f8f9fa;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  font-weight: 800;
`

const appendTrainLineStyle = css`
  div + & {
    border-top: 1px solid rgba(0, 0, 0, 0.5);
  }
`

export default TrainLineList
