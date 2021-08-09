import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'

type ModifyTrainLineTimeProps = {
  time: number
  // handleChangeTime: (event: ChangeEvent<HTMLInputElement>) => void
}

const ModifyTrainLineTime: FunctionComponent<ModifyTrainLineTimeProps> = function ({
  time,
  // handleChangeTime,
}) {
  return (
    <div css={modifyTrainLineTimeStyle}>
      <div css={modifyTrainLineTimeTitleStyle}>소요 시간 변경</div>

      <input
        css={modifyTrainLineTimeInputStyle}
        type="text"
        placeholder="해당 경로 소요 시간을 입력해주세요."
        value={time}
        // onChange={handleChangeTime}
      />
    </div>
  )
}

const modifyTrainLineTimeStyle = css`
  margin-top: 30px;
`

const modifyTrainLineTimeTitleStyle = css`
  margin-bottom: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.7);
`

const modifyTrainLineTimeInputStyle = css`
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

export default ModifyTrainLineTime
