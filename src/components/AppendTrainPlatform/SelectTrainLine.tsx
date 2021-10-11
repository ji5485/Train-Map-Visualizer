import { useState, FunctionComponent, ChangeEvent } from 'react'
import { css } from '@emotion/react'
import {
  defaultSelectedTrainLine,
  useStateTrainForm,
} from '../../state/FloatingForm/TrainPlatformFormState'
import useHandleClickOutSide from '../../hooks/useHandleClickOutSide'
import TrainLineList from '../AppendTrainPlatform/TrainLineList'
import TrainLineItem from '../AppendTrainPlatform/TrainLineItem'

const SelectTrainLine: FunctionComponent = function () {
  const [
    {
      selectedTrainLine: { id, name, color },
    },
    setTrainForm,
  ] = useStateTrainForm()
  const [trainLineName, setTrainLineName] = useState<string>('')
  const { ref, isVisible, setIsVisible, showComponent } =
    useHandleClickOutSide()

  const handleTrainLineNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTrainLineName(event.target.value)

  const handleResetSelectedTrainLine = () =>
    setTrainForm(prev => ({
      ...prev,
      selectedTrainLine: defaultSelectedTrainLine,
    }))

  return (
    <div css={selectTrainLineStyle} ref={ref}>
      {id === '' ? (
        <input
          css={inputTrainLineStyle}
          type="text"
          onFocus={showComponent}
          value={trainLineName}
          onChange={handleTrainLineNameChange}
        />
      ) : (
        <div css={selectedTrainLineStyle}>
          <TrainLineItem
            name={name}
            color={color}
            iconType="cancel"
            onClick={handleResetSelectedTrainLine}
          />
        </div>
      )}

      {isVisible && (
        <TrainLineList
          trainLineName={trainLineName}
          setTrainLineName={setTrainLineName}
          setIsVisible={setIsVisible}
        />
      )}
    </div>
  )
}

const selectTrainLineStyle = css`
  position: relative;
  width: 100%;
  height: 50px;
`

const inputTrainLineStyle = css`
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

const selectedTrainLineStyle = css`
  border-radius: 10px;
  background: #f1f3f5;
`

export default SelectTrainLine
