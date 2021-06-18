import React, { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import useModifyOrCancelAppendingTrain from 'hooks/useModifyOrCancelAppendingTrain'
import { useStateCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'
import { RiQuillPenFill } from 'react-icons/ri'
import { IoTrashBin } from 'react-icons/io5'
import { ImCancelCircle } from 'react-icons/im'

const ManageTrainInfoWidget: FunctionComponent = function () {
  const [currentMode, setCurrentMode] = useStateCoordinateSystemCurrentMode()
  const setHandMode = () => setCurrentMode('hand')

  const { modify, cancel } = useModifyOrCancelAppendingTrain(setHandMode)

  if (currentMode !== 'append' && currentMode !== 'line') return null

  return (
    <div css={manageTrainInfoWidgetStyle}>
      {currentMode === 'append' ? (
        <>
          <div css={widgetIconStyle('#69db7c')} onClick={modify}>
            <RiQuillPenFill />
          </div>
          <div css={widgetIconStyle('#fa5252')} onClick={cancel}>
            <IoTrashBin />
          </div>
        </>
      ) : (
        <div css={widgetIconStyle('#fa5252')} onClick={setHandMode}>
          <ImCancelCircle />
        </div>
      )}
    </div>
  )
}

const manageTrainInfoWidgetStyle = css`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;

  div + div {
    margin-left: 50px;
  }
`

const widgetIconStyle = (bgColor: string) => css`
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  background: #ffffff;
  border-radius: 50%;
  color: ${bgColor};
  font-size: 30px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: 0.3s all;

  &:hover {
    background: ${bgColor};
    color: #ffffff;
  }
`

export default ManageTrainInfoWidget
