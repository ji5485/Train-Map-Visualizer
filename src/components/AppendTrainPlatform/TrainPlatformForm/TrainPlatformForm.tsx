import { useState, useEffect, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainForm } from 'state/FloatingForm/trainFormState'
import { useSetFloatingForm } from 'state/FloatingForm/FloatingFormState'
import { useSetCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import FormFieldUnit from 'components/AppendTrainPlatform/FormFieldUnit'
import SelectTrainLine from 'components/AppendTrainPlatform/SelectTrainLine'
import EnterTrainPlatformName from 'components/AppendTrainPlatform/EnterTrainPlatformName'

const TrainPlatformForm: FunctionComponent = function () {
  const {
    selectedTrainLine: { id },
    trainPlatform: { isValid },
  } = useGetTrainForm()
  const setFloatingForm = useSetFloatingForm()
  const setCoordinateSystemCurrentMode = useSetCoordinateSystemCurrentMode()
  const [formIsValid, setFormIsValid] = useState<boolean>(id !== '' && isValid)

  useEffect(() => setFormIsValid(id !== '' && isValid), [id, isValid])

  const appendTrainPlatform = () => {
    setFloatingForm(prev => ({ ...prev, isOpen: false }))
    setCoordinateSystemCurrentMode('append')
  }

  return (
    <div css={trainPlatformFormStyle}>
      <FormFieldUnit title="호선 선택">
        <SelectTrainLine />
      </FormFieldUnit>
      <FormFieldUnit title="역 이름 입력">
        <EnterTrainPlatformName />
      </FormFieldUnit>

      <div
        css={createButtonStyle(formIsValid)}
        onClick={formIsValid ? appendTrainPlatform : undefined}
      >
        추가하기
      </div>
    </div>
  )
}

const trainPlatformFormStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const createButtonStyle = (formIsValid: boolean) => css`
  display: grid;
  place-items: center;
  width: 100%;
  height: 45px;
  margin-top: 30px;
  background: ${formIsValid ? '#1971c2' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 10px;
  font-weight: 800;
  color: #ffffff;
  cursor: ${formIsValid ? 'pointer' : 'not-allowed'};
  user-select: none;
  transition: 0.3s background;

  ${formIsValid && '&:hover { background: #1864ab }'}
`

export default TrainPlatformForm
