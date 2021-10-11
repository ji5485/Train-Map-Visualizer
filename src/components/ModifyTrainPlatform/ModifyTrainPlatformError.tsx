import { useEffect, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import {
  useManageModifyTrainPlatformForm,
  useManageModifyTrainPlatformFormStatus,
} from '../../state/FloatingForm/ModifyTrainPlatformState'
import { useGetCoordinatePlaneSize } from '../../state/CoordinateSystem/CoordinatePlaneSizeState'
import { useManageTrainPlatform } from '../../state/Train/TrainMapState'

const ModifyTrainPlatformError: FunctionComponent = function () {
  const {
    modifyTrainPlatformForm: { name, nodeNumber },
  } = useManageModifyTrainPlatformForm()
  const {
    modifyTrainPlatformFormStatus: { isModifyingName, error },
    setModifyTrainPlatformFormStatus,
  } = useManageModifyTrainPlatformFormStatus()
  const { width, height } = useGetCoordinatePlaneSize()
  const { trainPlatformMatrix } = useManageTrainPlatform()

  const getNodeNumberWithPosition = (row: number, column: number) =>
    row * width + column

  const checkTrainPlatformAlreadyExists = () => {
    for (let row = 0; row < height; row++) {
      for (let column = 0; column < width; column++) {
        const trainPlatform = trainPlatformMatrix[row][column]
        if (
          trainPlatform === null ||
          getNodeNumberWithPosition(row, column) === nodeNumber
        )
          continue

        if (trainPlatform.name === name) return true
      }
    }

    return false
  }

  const setErrorMessage = (error: string) =>
    setModifyTrainPlatformFormStatus(prev => ({
      ...prev,
      error,
    }))

  useEffect(() => {
    if (isModifyingName) return

    if (name === '') {
      setErrorMessage('역 이름을 입력해주세요.')
      return
    } else if (!/^[가-힣]{2,5}$/.test(name)) {
      setErrorMessage('역 이름은 한글 2글자 ~ 5글자로 설정해주세요.')
      return
    } else if (checkTrainPlatformAlreadyExists()) {
      setErrorMessage('역 이름이 이미 사용 중입니다.')
      return
    }

    return () => setErrorMessage('')
  }, [isModifyingName])

  if (error === '') return null

  return <div css={modifyTrainPlatformErrorStyle}>{error}</div>
}

const modifyTrainPlatformErrorStyle = css`
  margin-top: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 0, 0, 0.8);
`

export default ModifyTrainPlatformError
