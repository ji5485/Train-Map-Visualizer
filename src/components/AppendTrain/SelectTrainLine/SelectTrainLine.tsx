import { useState, FunctionComponent, ChangeEvent } from 'react'
import { jsx, css } from '@emotion/react'
import {
  defaultSelectedTrainLine,
  useStateTrainForm,
} from 'state/sideBar/trainFormState'
import useHandleClickOutSide from 'hooks/useHandleClickOutSide'
import TrainLineList from 'components/AppendTrain/TrainLineList'
import TrainLineItem from 'components/AppendTrain/TrainLineItem'

const SelectTrainLine: FunctionComponent = function () {
  const [
    {
      selectedTrainLine: { id, name, color },
      trainLineName,
    },
    setTrainForm,
  ] = useStateTrainForm()
  const [selectorIsVisible, setSelectorIsVisible] = useState<boolean>(false)
  const clickOutSideRef = useHandleClickOutSide(selectorIsVisible, () =>
    setSelectorIsVisible(false),
  )

  const handleTrainLineNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTrainForm(prev => ({ ...prev, trainLineName: event.target.value }))
  const handleShowTrainLineList = () => setSelectorIsVisible(true)
  const handleResetSelectedTrainLine = () =>
    setTrainForm(prev => ({
      ...prev,
      selectedTrainLine: defaultSelectedTrainLine,
    }))

  return (
    <div css={selectTrainLineStyle} ref={clickOutSideRef}>
      {id === '' ? (
        <input
          css={inputTrainLineStyle}
          type="text"
          onFocus={handleShowTrainLineList}
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

      {selectorIsVisible && (
        <TrainLineList setSelectorIsVisible={setSelectorIsVisible} />
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

const selectedTrainLineStyle = css`
  border-radius: 10px;
  background: #f1f3f5;
`

export default SelectTrainLine
