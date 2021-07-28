import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import TrainLineItemForm from 'components/ModifyTrainPlatform/TrainLineItemForm'
import ModifyTrainPlatformName from 'components/ModifyTrainPlatform/ModifyTrainPlatformName'

const ModifyForm: FunctionComponent = function () {
  return (
    <div>
      <TrainLineItemForm />
      <ModifyTrainPlatformName />
      <div css={modifyFormButtonBox}>
        <div css={modifyButtonStyle(true)}>변경하기</div>
        <div css={removeButtonStyle}>제거하기</div>
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
