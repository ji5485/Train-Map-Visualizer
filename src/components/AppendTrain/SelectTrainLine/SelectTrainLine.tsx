import { useState, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainLineById, TrainLineType } from 'state/train/trainLineState'
import TrainLineList from 'components/AppendTrain/TrainLineList'
import TrainLineItem from 'components/AppendTrain/TrainLineItem'

type SelectTrainLineProps = {
  selectedTrainLineId: string
}

const SelectTrainLine: FunctionComponent<SelectTrainLineProps> = function ({
  selectedTrainLineId,
}) {
  const { id, name, color }: TrainLineType = useGetTrainLineById(
    selectedTrainLineId,
  )

  const [visibleList, setVisibleList] = useState<boolean>(false)

  const handleShowTrainLineList = () => setVisibleList(true)

  return (
    <div css={selectTrainLineStyle}>
      {selectedTrainLineId === '' || id === '' ? (
        <input
          css={inputTrainLineStyle}
          type="text"
          onFocus={handleShowTrainLineList}
        />
      ) : (
        <div css={selectedTrainLineStyle}>
          <TrainLineItem name={name} color={color} />
        </div>
      )}

      {visibleList && <TrainLineList />}
    </div>
  )
}

const selectTrainLineStyle = css`
  position: relative;
  width: 100%;
  height: 50px;
`

const inputTrainLineStyle = css`
  width: 100%;
  height: 50px;
  border: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.7);
  font-size: 1.1rem;
  outline: none;
  transition: border-bottom 0.3s;

  &:focus {
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
`

const selectedTrainLineStyle = css`
  border-radius: 10px;
  background: #f1f3f5;
`

export default SelectTrainLine
