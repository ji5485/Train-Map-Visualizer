import { useState, FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import useHandleClickOutSide from 'hooks/useHandleClickOutSide'
import TrainPlatformList from 'components/FindTrainPath/TrainPlatformList'

type FindTrainPathFormItemProps = {
  type: 'start' | 'destination'
}

const FindTrainPathFormItem: FunctionComponent<FindTrainPathFormItemProps> = function ({
  type,
}) {
  const [platform, setPlatform] = useState<string>('')
  const {
    ref,
    isVisible,
    // setIsVisible,
    showComponent,
  } = useHandleClickOutSide()

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setPlatform(value)

  return (
    <div css={findTrainPathFormItemStyle} ref={ref}>
      <input
        css={findTrainPathFormItemInputStyle(type)}
        type="text"
        value={platform}
        onChange={handleChange}
        onFocus={showComponent}
        placeholder={`${type === 'start' ? '출발' : '도착'}역을 입력해주세요.`}
      />

      {isVisible ? <TrainPlatformList /> : null}
    </div>
  )
}

const findTrainPathFormItemStyle = css`
  position: relative;
`

const findTrainPathFormItemInputStyle = (type: 'start' | 'destination') => css`
  width: 100%;
  height: 45px;
  padding: 12px;
  border: 1.5px solid rgba(0, 0, 0, 0.5);
  ${type === 'destination' && 'border-top: 0;'}
  font-size: 1rem;
  outline: none;
`

export default FindTrainPathFormItem
