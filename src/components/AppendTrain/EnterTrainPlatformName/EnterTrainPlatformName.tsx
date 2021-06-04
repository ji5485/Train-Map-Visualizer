import { useState, FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { useStateTrainForm } from 'state/sideBar/trainFormState'
import { useGetTrainPlatform } from 'state/train/trainPlatformState'

const EnterTrainPlatformName: FunctionComponent = function () {
  const [
    {
      selectedTrainLine: { id },
      trainPlatform: { name: trainPlatformName },
    },
    setTrainForm,
  ] = useStateTrainForm()
  const trainPlatformList = useGetTrainPlatform()
  const [error, setError] = useState<string>('')

  const handleTrainPlatformNameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) =>
    setTrainForm(prev => ({
      ...prev,
      trainPlatform: {
        ...prev.trainPlatform,
        name: event.target.value,
      },
    }))
  const checkTrainPlatformIsValid = () => {
    const setValidationOfTrainPlatformName = (isValid: boolean) =>
      setTrainForm(prev => ({
        ...prev,
        trainPlatform: {
          ...prev.trainPlatform,
          isValid,
        },
      }))

    setValidationOfTrainPlatformName(false)

    if (trainPlatformName === '') {
      setError('')
      return
    }

    if (!/^[가-힣]{2,5}$/.test(trainPlatformName))
      setError('역 이름은 한글 2글자 ~ 5글자로 설정해주세요.')
    else if (
      trainPlatformList.filter(
        ({ name, line }) => name === trainPlatformName && line.includes(id),
      ).length !== 0
    )
      setError('동일 호선에 같은 이름의 역이 존재합니다.')
    else {
      setError('')
      setValidationOfTrainPlatformName(true)
    }
  }

  return (
    <div>
      <input
        css={enterTrainPlatformNameStyle}
        type="text"
        placeholder="끝에 '역'을 입력해주세요."
        value={trainPlatformName}
        onChange={handleTrainPlatformNameChange}
        onBlur={checkTrainPlatformIsValid}
      />
      {error !== '' && <div css={errorMessageStyle}>{error}</div>}
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

const errorMessageStyle = css`
  margin-top: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 0, 0, 0.8);
`

export default EnterTrainPlatformName