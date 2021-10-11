import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import produce from 'immer'
import { useManageModifyTrainLineForm } from '../../state/FloatingForm/ModifyTrainLineState'
import { useManageTrainMapGraph } from '../../state/Train/TrainMapGraphState'
import { useSetFloatingForm } from '../../state/FloatingForm/FloatingFormState'
import SelectedTrainLine from '../ModifyTrainLine/SelectedTrainLine'
import ModifyTrainLineTime from '../ModifyTrainLine/ModifyTrainLineTime'
import useFindTrainLinePath from '../../hooks/useFindTrainLinePath'

const ModifyTrainLineForm: FunctionComponent = function () {
  const {
    modifyTrainLineForm: { selectedTrainLine, connectedTrainPlatform, time },
    setModifyTrainLineForm,
  } = useManageModifyTrainLineForm()
  const { setTrainMapGraph } = useManageTrainMapGraph()
  const setFloatingForm = useSetFloatingForm()
  const { removeLineWithSelectedLine } = useFindTrainLinePath()

  const setSelectedTrainLineTime = (time: number) =>
    setModifyTrainLineForm(prev =>
      produce(prev, draft => {
        draft.time = time
        return draft
      }),
    )

  const setTrainLineMap =
    (
      trainLineMapSetter: (
        firstNodeNumber: number,
        secondNodeNumber: number,
      ) => void,
    ) =>
    () => {
      if (connectedTrainPlatform.length !== 2) return

      const firstNodeNumber = connectedTrainPlatform[0].nodeNumber
      const secondNodeNumber = connectedTrainPlatform[1].nodeNumber

      trainLineMapSetter(firstNodeNumber, secondNodeNumber)
      setFloatingForm(prev => ({ ...prev, isOpen: false }))
    }

  const modifyTrainLine = (
    firstNodeNumber: number,
    secondNodeNumber: number,
  ) => {
    setTrainMapGraph(prev =>
      produce(prev, draft => {
        draft[firstNodeNumber][secondNodeNumber]!.time = draft[
          secondNodeNumber
        ][firstNodeNumber]!.time = time
        return draft
      }),
    )
  }

  const removeTrainLine = (
    firstNodeNumber: number,
    secondNodeNumber: number,
  ) => {
    if (selectedTrainLine === null) return

    removeLineWithSelectedLine(firstNodeNumber, selectedTrainLine)
    setTrainMapGraph(prev =>
      produce(prev, draft => {
        draft[firstNodeNumber][secondNodeNumber] = draft[secondNodeNumber][
          firstNodeNumber
        ] = null
        return draft
      }),
    )
  }

  if (selectedTrainLine === null || connectedTrainPlatform.length === 0)
    return null

  return (
    <div>
      <SelectedTrainLine
        selectedTrainLine={selectedTrainLine}
        connectedTrainPlatform={connectedTrainPlatform}
      />
      <ModifyTrainLineTime
        time={time}
        setSelectedTrainLineTime={setSelectedTrainLineTime}
      />

      <div css={modifyFormButtonBox}>
        <div css={modifyButtonStyle} onClick={setTrainLineMap(modifyTrainLine)}>
          변경하기
        </div>
        <div css={removeButtonStyle} onClick={setTrainLineMap(removeTrainLine)}>
          제거하기
        </div>
      </div>
    </div>
  )
}

const modifyFormButtonBox = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  height: 40px;
  margin-top: 30px;
`

const modifyButtonStyle = css`
  display: grid;
  place-items: center;
  background: #1971c2;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 800;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
  transition: 0.3s background;

  &:hover {
    background: #1864ab;
  }
`

const removeButtonStyle = css`
  display: grid;
  place-items: center;
  border-radius: 10px;
  border: 2px solid #fa5252;
  font-size: 0.9rem;
  font-weight: 800;
  color: #fa5252;
  cursor: pointer;
  user-select: none;
  transition: 0.3s all;

  &:hover {
    background: #fa5252;
    color: #ffffff;
  }
`

export default ModifyTrainLineForm
