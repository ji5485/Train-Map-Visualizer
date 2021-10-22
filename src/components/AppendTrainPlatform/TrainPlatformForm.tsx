import { useState, FunctionComponent } from 'react'
import { css } from '@emotion/react'
import { useGetTrainForm } from '../../state/FloatingForm/TrainPlatformFormState'
import { useSetFloatingForm } from '../../state/FloatingForm/FloatingFormState'
import { useSetCoordinateSystemCurrentMode } from '../../state/CoordinateSystem/CoordinateSystemCurrentModeState'
import { TrainFormValidityType } from '../../types/FloatingForm.types'
import FormFieldUnit from '../AppendTrainPlatform/FormFieldUnit'
import SelectTrainLine from '../AppendTrainPlatform/SelectTrainLine'
import EnterTrainPlatformName from '../AppendTrainPlatform/EnterTrainPlatformName'

const TrainPlatformForm: FunctionComponent = function () {
  const {
    selectedTrainLine: { id },
  } = useGetTrainForm()
  const setFloatingForm = useSetFloatingForm()
  const setCoordinateSystemCurrentMode = useSetCoordinateSystemCurrentMode()
  const [{ validity, error }, setValidity] = useState<TrainFormValidityType>({
    validity: false,
    error: '',
  })

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
        <EnterTrainPlatformName
          validity={validity}
          error={error}
          setValidity={setValidity}
        />
      </FormFieldUnit>

      <div
        css={createButtonStyle(id !== '' && validity)}
        onClick={id !== '' && validity ? appendTrainPlatform : undefined}
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
  font-weight: 700;
  color: #ffffff;
  cursor: ${formIsValid ? 'pointer' : 'not-allowed'};
  user-select: none;
  transition: 0.3s background;

  ${formIsValid && '&:hover { background: #1864ab }'}
`

export default TrainPlatformForm
