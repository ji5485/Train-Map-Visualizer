import { useState, FunctionComponent, ChangeEvent } from 'react'
import { css } from '@emotion/react'

type ModifyTrainLineTimeProps = {
  time: number
  setSelectedTrainLineTime: (time: number) => void
}

const ModifyTrainLineTime: FunctionComponent<ModifyTrainLineTimeProps> =
  function ({ time, setSelectedTrainLineTime }) {
    const [trainLineTime, setTrainLineTime] = useState<string>(String(time))

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
      setTrainLineTime(event.target.value)

    const validateTrainLineTime = () => {
      if (!/^[0-9]{1,5}$/.test(trainLineTime)) setTrainLineTime(String(time))
      else if (parseInt(trainLineTime) <= 0 || parseInt(trainLineTime) > 1000)
        setTrainLineTime(String(time))
      else setSelectedTrainLineTime(parseInt(trainLineTime))
    }

    return (
      <div css={modifyTrainLineTimeStyle}>
        <div css={modifyTrainLineTimeTitleStyle}>소요 시간 변경</div>

        <input
          css={modifyTrainLineTimeInputStyle}
          type="text"
          placeholder="해당 경로 소요 시간을 입력해주세요."
          value={trainLineTime}
          onChange={handleChange}
          onBlur={validateTrainLineTime}
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
