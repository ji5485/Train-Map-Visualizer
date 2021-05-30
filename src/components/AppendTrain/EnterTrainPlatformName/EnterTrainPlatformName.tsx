import { useState, FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { useStateTrainForm } from 'state/sideBar/trainFormState'
// import { useGetTrainPlatform } from 'state/train/trainPlatformState'

const EnterTrainPlatformName: FunctionComponent = function () {
  const [
    {
      // selectedTrainLine: { id },
      trainPlatformName,
    },
    setTrainForm,
  ] = useStateTrainForm()
  // const trainPlatform = useGetTrainPlatform()
  const [error, setError] = useState<string>('')

  const handleTrainPlatformNameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) =>
    setTrainForm(prev => ({ ...prev, trainPlatformName: event.target.value }))
  const checkTrainPlatformIsValid = () => {
    if (/[^가-힣]{2,5}/.test(trainPlatformName))
      setError('역 이름은 2~5글자의 한글로 지정해주세요.')
  }

  return (
    <div>
      <input
        css={enterTrainPlatformNameStyle}
        type="text"
        value={trainPlatformName}
        onChange={handleTrainPlatformNameChange}
        onBlur={checkTrainPlatformIsValid}
      />
      {error !== '' && <div>{error}</div>}
    </div>
  )
}

const enterTrainPlatformNameStyle = css`
  width: 100%;
  height: 50px;
  border: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  font-size: 1.1rem;
  outline: none;
  transition: border-bottom 0.3s;

  &:focus {
    border-bottom: 2px solid rgba(0, 0, 0, 1);
  }
`

export default EnterTrainPlatformName
