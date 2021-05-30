import { useState, FunctionComponent, Dispatch, SetStateAction } from 'react'
import { jsx, css } from '@emotion/react'
import {
  TrainLineType,
  useGetFilteredTrainLine,
  // useAppendTrainLine,
} from 'state/train/trainLineState'
import {
  TrainLineColorName,
  useGetRandomUnusedColor,
} from 'state/train/trainLineColorState'
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
  const [newTrainLineColor] = useState<TrainLineColorName>(
    useGetRandomUnusedColor(),
  )

  const selectTrainLine = (selectedLineId: string) => () => {
    setTrainForm({ selectedLineId, trainLineName: '' })
    setSelectorIsVisible(false)
  }
  // const appendTrainLine = () => {
  //   useAppendTrainLine(trainLineName)
  // }

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

      <div css={appendTrainLineStyle}>
        <div>신규 생성</div>

        <TrainLineItem
          name={trainLineName}
          color={newTrainLineColor}
          iconType="check"
          onClick={() => console.log('hello')}
        />
      </div>
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

const appendTrainLineStyle = css``

export default TrainLineList
