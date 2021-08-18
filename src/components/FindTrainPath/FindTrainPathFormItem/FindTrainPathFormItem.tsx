import { useState, FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import { FindTrainPathFormType } from 'types/FloatingForm.types'
import useHandleClickOutSide from 'hooks/useHandleClickOutSide'
import TrainPlatformList from 'components/FindTrainPath/TrainPlatformList'

type FindTrainPathFormItemProps = {
  type: keyof FindTrainPathFormType
}

const FindTrainPathFormItem: FunctionComponent<FindTrainPathFormItemProps> = function ({
  type,
}) {
  const [trainPlatformName, setTrainPlatformName] = useState<string>('')
  const {
    ref,
    isVisible,
    // setIsVisible,
    showComponent,
  } = useHandleClickOutSide()

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setTrainPlatformName(value)

  return (
    <div css={findTrainPathFormItemStyle} ref={ref}>
      <input
        css={findTrainPathFormItemInputStyle(type)}
        type="text"
        value={trainPlatformName}
        onChange={handleChange}
        onFocus={showComponent}
        placeholder={`${type === 'start' ? '출발' : '도착'}역을 입력해주세요.`}
      />

      {isVisible && trainPlatformName !== '' ? (
        <TrainPlatformList type={type} trainPlatformName={trainPlatformName} />
      ) : null}
    </div>
  )
}

const findTrainPathFormItemStyle = css`
  position: relative;
`

const findTrainPathFormItemInputStyle = (
  type: keyof FindTrainPathFormType,
) => css`
  width: 100%;
  height: 45px;
  padding: 12px;
  border-radius: ${type === 'start' ? '20px 20px 0 0' : '0 0 20px 20px'};
  border: 0;
  ${type === 'destination' && 'border-top: 1px solid rgba(0, 0, 0, 0.15);'}
  font-size: 1rem;
  text-align: center;
  outline: none;
`

export default FindTrainPathFormItem
