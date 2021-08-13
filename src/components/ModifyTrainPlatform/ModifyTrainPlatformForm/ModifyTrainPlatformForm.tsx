import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import produce from 'immer'
import TrainLineItemForm from 'components/ModifyTrainPlatform/TrainLineItemForm'
import ModifyTrainPlatformName from 'components/ModifyTrainPlatform/ModifyTrainPlatformName'
import ModifyTrainPlatformError from 'components/ModifyTrainPlatform/ModifyTrainPlatformError'
import {
  useManageModifyTrainPlatformForm,
  useManageModifyTrainPlatformFormStatus,
} from 'state/FloatingForm/ModifyTrainPlatformState'
import {
  useManageTrainPlatform,
  useManageTrainLine,
} from 'state/Train/TrainMapState'
import { useSetFloatingForm } from 'state/FloatingForm/FloatingFormState'
import useGetPositionByNodeNumber from 'hooks/useGetPositionByNodeNumber'
import useFindTrainLinePath from 'hooks/useFindTrainLinePath'
import { TrainPlatformType, TrainLineDirection } from 'types/Train.types'

const ModifyForm: FunctionComponent = function () {
  const { modifyTrainPlatformForm } = useManageModifyTrainPlatformForm()
  const {
    modifyTrainPlatformFormStatus: { error },
  } = useManageModifyTrainPlatformFormStatus()
  const { setTrainPlatformMatrix } = useManageTrainPlatform()
  const { trainLineMatrix } = useManageTrainLine()
  const { removeLineWithSelectedLine } = useFindTrainLinePath()
  const {
    nextNodeNumber,
    getPositionByNodeNumber,
    checkNotExistNextNodeInCoord,
  } = useGetPositionByNodeNumber(modifyTrainPlatformForm.nodeNumber)
  const setFloatingForm = useSetFloatingForm()

  const trainPlatformSetter = (modified: TrainPlatformType | null) => {
    const { row, column } = getPositionByNodeNumber(
      modifyTrainPlatformForm.nodeNumber,
    )

    setTrainPlatformMatrix(prev =>
      produce(prev, draft => {
        draft[row][column] = modified
        return draft
      }),
    )
    setFloatingForm(prev => ({ ...prev, isOpen: false }))
  }

  const modifyTrainPlatform = () => trainPlatformSetter(modifyTrainPlatformForm)

  const removeTrainPlatform = () => {
    const nodeNumber = modifyTrainPlatformForm.nodeNumber

    Object.entries(nextNodeNumber).forEach(next => {
      if (
        checkNotExistNextNodeInCoord(nodeNumber, next[0] as TrainLineDirection)
      )
        return

      const trainLine = trainLineMatrix[nodeNumber][next[1]]
      if (trainLine === null) return

      removeLineWithSelectedLine(nodeNumber, trainLine)
    })

    trainPlatformSetter(null)
  }

  return (
    <div>
      <TrainLineItemForm />
      <ModifyTrainPlatformName />
      <ModifyTrainPlatformError />

      <div css={modifyFormButtonBox}>
        <div
          css={modifyButtonStyle(!error)}
          onClick={!error ? modifyTrainPlatform : undefined}
        >
          변경하기
        </div>
        <div css={removeButtonStyle} onClick={removeTrainPlatform}>
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

const modifyButtonStyle = (formIsValid: boolean) => css`
  display: grid;
  place-items: center;
  background: ${formIsValid ? '#1971c2' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 800;
  color: #ffffff;
  cursor: ${formIsValid ? 'pointer' : 'not-allowed'};
  user-select: none;
  transition: 0.3s background;

  ${formIsValid && '&:hover { background: #1864ab }'}
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

export default ModifyForm
