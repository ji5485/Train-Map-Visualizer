import { FunctionComponent, Dispatch, SetStateAction } from 'react'
import { jsx, css } from '@emotion/react'
import useVisibleNewTrainLineItem from 'hooks/useVisibleNewTrainLineItem'
import useManageTrainLine from 'hooks/useManageTrainLine'
import {
  TrainLineType,
  useGetFilteredTrainLine,
} from 'state/train/trainLineState'
import { useStateTrainForm } from 'state/sideBar/trainFormState'
import TrainLineItem from 'components/AppendTrain/TrainLineItem'

type TrainLineListProps = {
  setSelectorIsVisible: Dispatch<SetStateAction<boolean>>
}

const TrainLineList: FunctionComponent<TrainLineListProps> = function ({
  setSelectorIsVisible,
}) {
  const [{ trainLineName }, setTrainForm] = useStateTrainForm()
  const trainLine = useGetFilteredTrainLine(trainLineName)
  const { newTrainLineColor, newTrainLineVisible } = useVisibleNewTrainLineItem(
    trainLine,
    trainLineName,
  )
  const { createTrainLine, getTrainLineById } = useManageTrainLine()

  const selectTrainLine = (selectedLineId: string) => () => {
    const selectedTrainLine = getTrainLineById(selectedLineId)
    if (selectedTrainLine === undefined) return

    setTrainForm(prev => ({ ...prev, selectedTrainLine, trainLineName: '' }))
    setSelectorIsVisible(false)
  }
  const appendTrainLine = () => {
    const newTrainLine = createTrainLine(trainLineName, newTrainLineColor)
    setTrainForm(prev => ({
      ...prev,
      selectedTrainLine: newTrainLine,
      trainLineName: '',
    }))
    setSelectorIsVisible(false)
  }

  if (trainLine.length === 0 && trainLineName === '')
    return <div css={emptyTrainLine}>호선을 새로 추가해주세요.</div>

  return (
    <div css={trainLineListStyle}>
      {trainLine.map(({ id, name, color }: TrainLineType) => (
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
