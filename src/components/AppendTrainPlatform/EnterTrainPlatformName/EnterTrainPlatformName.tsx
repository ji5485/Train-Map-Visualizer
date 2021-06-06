import { FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { useStateTrainForm } from 'state/sideBar/trainFormState'
import {
  TrainPlatformType,
  useGetTrainPlatform,
} from 'state/train/trainPlatformState'

const EnterTrainPlatformName: FunctionComponent = function () {
  const [
    {
      selectedTrainLine: { id },
      trainPlatform: { name: trainPlatformName, error },
    },
    setTrainForm,
  ] = useStateTrainForm()
  const trainPlatformMatrix = useGetTrainPlatform()

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
    const setValidationOfTrainPlatformName = (
      isValid: boolean,
      error: string,
    ) =>
      setTrainForm(prev => ({
        ...prev,
        trainPlatform: {
          name: trainPlatformName,
          isValid,
          error,
        },
      }))

    setValidationOfTrainPlatformName(false, '')

    if (trainPlatformName === '') {
      setValidationOfTrainPlatformName(false, '')
      return
    }

    if (!/^[가-힣]{2,5}$/.test(trainPlatformName))
      setValidationOfTrainPlatformName(
        false,
        '역 이름은 한글 2글자 ~ 5글자로 설정해주세요.',
      )
    else if (
      trainPlatformMatrix.every(trainPlatformList => {
        trainPlatformList.filter((trainPlatform: TrainPlatformType | null) => {
          if (trainPlatform === null) return false

          const { name, line } = trainPlatform
          return (
            name === trainPlatformName &&
            line.find(trainLine => trainLine.id === id)
          )
        }).length !== 0
      })
    )
      setValidationOfTrainPlatformName(
        false,
        '동일 호선에 같은 이름의 역이 존재합니다.',
      )
    else setValidationOfTrainPlatformName(true, '')
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
