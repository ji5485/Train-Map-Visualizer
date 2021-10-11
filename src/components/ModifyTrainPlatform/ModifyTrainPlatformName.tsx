import { FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import {
  useManageModifyTrainPlatformForm,
  useManageModifyTrainPlatformFormStatus,
} from '../../state/FloatingForm/ModifyTrainPlatformState'

const ModifyTrainPlatformName: FunctionComponent = function () {
  const {
    modifyTrainPlatformForm: { name },
    setModifyTrainPlatformForm,
  } = useManageModifyTrainPlatformForm()
  const { setModifyTrainPlatformFormStatus } =
    useManageModifyTrainPlatformFormStatus()

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setModifyTrainPlatformForm(prev => ({
      ...prev,
      name: value,
    }))

  const handleFocus = (isModifyingName: boolean) =>
    setModifyTrainPlatformFormStatus(prev => ({ ...prev, isModifyingName }))

  return (
    <div css={modifyPlatformNameBoxStyle}>
      <div css={modifyPlatformNameBoxTitleStyle}>역 이름 변경</div>

      <input
        css={modifyPlatformNameInputStyle}
        type="text"
        placeholder="2~5글자로 입력해주세요."
        value={name}
        onChange={handleChange}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
      />
    </div>
  )
}

const modifyPlatformNameBoxStyle = css`
  margin-top: 30px;
`

const modifyPlatformNameBoxTitleStyle = css`
  margin-bottom: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
`

const modifyPlatformNameInputStyle = css`
  width: 100%;
  height: 40px;
  border: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  font-size: 1rem;
  outline: none;
  transition: border-bottom 0.3s;

  &:focus {
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
`

export default ModifyTrainPlatformName
