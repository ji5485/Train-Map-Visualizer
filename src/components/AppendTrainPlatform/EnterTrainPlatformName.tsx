import {
  useState,
  useEffect,
  FunctionComponent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { css } from '@emotion/react'
import { useSetTrainForm } from '../../state/FloatingForm/TrainPlatformFormState'
import { useManageTrainPlatform } from '../../state/Train/TrainMapState'
import { useGetCoordinatePlaneSize } from '../../state/CoordinateSystem/CoordinatePlaneSizeState'
import { TrainFormValidityType } from '../../types/FloatingForm.types'

type EnterTrainPlatformNameProps = {
  validity: boolean
  error: string
  setValidity: Dispatch<SetStateAction<TrainFormValidityType>>
}

const EnterTrainPlatformName: FunctionComponent<EnterTrainPlatformNameProps> =
  function ({ validity, error, setValidity }) {
    const [trainPlatformName, setTrainPlatformName] = useState<string>('')
    const setTrainForm = useSetTrainForm()
    const { width, height } = useGetCoordinatePlaneSize()
    const { trainPlatformMatrix } = useManageTrainPlatform()

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) =>
      setTrainPlatformName(event.target.value)

    const handleSetName = () => {
      if (validity) setTrainForm(prev => ({ ...prev, trainPlatformName }))
    }

    const checkTrainPlatformAlreadyExists = () => {
      for (let row = 0; row < height; row++) {
        for (let column = 0; column < width; column++) {
          const trainPlatform = trainPlatformMatrix[row][column]
          if (trainPlatform === null) continue

          if (trainPlatform.name === trainPlatformName) return true
        }
      }

      return false
    }

    useEffect(() => {
      if (trainPlatformName === '') setValidity({ validity: false, error: '' })
      else if (!/^[가-힣]{2,5}$/.test(trainPlatformName))
        setValidity({
          validity: false,
          error: '역 이름은 한글 2글자 ~ 5글자로 설정해주세요.',
        })
      else if (checkTrainPlatformAlreadyExists())
        setValidity({
          validity: false,
          error: '해당 이름이 이미 사용 중입니다.',
        })
      else setValidity({ validity: true, error: '' })
    }, [trainPlatformName])

    return (
      <div>
        <input
          css={enterTrainPlatformNameStyle}
          type="text"
          placeholder="2~5글자로 입력해주세요."
          value={trainPlatformName}
          onChange={handleChangeName}
          onBlur={handleSetName}
        />
        {error !== '' ? <div css={errorMessageStyle}>{error}</div> : null}
      </div>
    )
  }

const enterTrainPlatformNameStyle = css`
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

const errorMessageStyle = css`
  margin-top: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 0, 0, 0.8);
`

export default EnterTrainPlatformName
