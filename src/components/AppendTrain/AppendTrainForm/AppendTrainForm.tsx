import { useState, useEffect, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetTrainForm } from 'state/sideBar/trainFormState'
import { useSetSideBar } from 'state/sideBar/sideBarState'
import { useSetCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'
import FormBox from 'components/AppendTrain/FormBox'
import SelectTrainLine from 'components/AppendTrain/SelectTrainLine'
import EnterTrainPlatformName from 'components/AppendTrain/EnterTrainPlatformName'

const AppendTrainForm: FunctionComponent = function () {
  const {
    selectedTrainLine: { id },
    trainPlatform: { isValid },
  } = useGetTrainForm()
  const setSideBar = useSetSideBar()
  const setCoordinateSystemCurrentMode = useSetCoordinateSystemCurrentMode()
  const [formIsValid, setFormIsValid] = useState<boolean>(id !== '' && isValid)

  useEffect(() => setFormIsValid(id !== '' && isValid), [id, isValid])

  const appendTrainPlatform = () => {
    setSideBar(prev => ({ ...prev, isOpen: false }))
    setCoordinateSystemCurrentMode('append')
  }

  return (
    <div css={appendTrainFormStyle}>
      <FormBox title="호선 선택">
        <SelectTrainLine />
      </FormBox>
      <FormBox title="역 이름 입력">
        <EnterTrainPlatformName />
      </FormBox>

      <div
        css={createButtonStyle(formIsValid)}
        onClick={formIsValid ? appendTrainPlatform : undefined}
      >
        추가하기
      </div>
    </div>
  )
}

const appendTrainFormStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const createButtonStyle = (formIsValid: boolean) => css`
  display: grid;
  place-items: center;
  width: 100%;
  height: 45px;
  margin-top: auto;
  background: ${formIsValid ? '#1971c2' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 10px;
  font-weight: 800;
  color: #ffffff;
  cursor: ${formIsValid ? 'pointer' : 'not-allowed'};
  user-select: none;
  transition: 0.3s background;

  ${formIsValid && '&:hover { background: #1864ab }'}
`

export default AppendTrainForm
