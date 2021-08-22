import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import FindPathTrainFormItem from 'components/FindTrainPath/FindTrainPathFormItem'
import { useManageFindTrainPathForm } from 'state/FloatingForm/FindTrainPathState'

const FindTrainPathForm: FunctionComponent = function () {
  const {
    findTrainPathForm: { start, destination },
  } = useManageFindTrainPathForm()
  const formIsValid = start !== null && destination !== null

  const findTrainPath = () => console.log('abc')

  return (
    <div>
      <div css={findTrainPathFormBoxStyle}>
        <FindPathTrainFormItem type="start" />
        <FindPathTrainFormItem type="destination" />
      </div>

      <div
        css={findPathButtonStyle(formIsValid)}
        onClick={formIsValid ? findTrainPath : undefined}
      >
        경로 찾기
      </div>
    </div>
  )
}

const findTrainPathFormBoxStyle = css`
  border-radius: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
`

const findPathButtonStyle = (formIsValid: boolean) => css`
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

export default FindTrainPathForm
