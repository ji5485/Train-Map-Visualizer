import React, { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import useModifyOrCancelAppendingTrain from 'hooks/useModifyOrCancelAppendingTrain'
import useGoBackOrCancelDrawingTrainLine from 'hooks/useGoBackOrCancelDrawingTrainLine'
import { useGetCoordinateSystemCurrentMode } from 'state/CoordinateSystem/CoordinateSystemCurrentModeState'
import { RiQuillPenFill } from 'react-icons/ri'
import { IoTrashBin } from 'react-icons/io5'
import { ImCancelCircle } from 'react-icons/im'
import { RiArrowGoBackFill } from 'react-icons/ri'

const HelperWidget: FunctionComponent = function () {
  const currentMode = useGetCoordinateSystemCurrentMode()

  const {
    modify: modifyAppendingTrainPlatform,
    cancel: cancelAppendingTrainPlatform,
  } = useModifyOrCancelAppendingTrain()
  const { goBack: goBackDrawingTrainLine, cancel: cancelDrawingTrainLine } =
    useGoBackOrCancelDrawingTrainLine()

  if (currentMode === 'append')
    return (
      <div css={helperWidgetStyle}>
        <div
          css={widgetIconStyle('#69db7c')}
          onClick={modifyAppendingTrainPlatform}
        >
          <RiQuillPenFill />
        </div>
        <div
          css={widgetIconStyle('#fa5252')}
          onClick={cancelAppendingTrainPlatform}
        >
          <IoTrashBin />
        </div>
      </div>
    )

  if (currentMode === 'draw')
    return (
      <div css={helperWidgetStyle}>
        <div css={widgetIconStyle('#69db7c')} onClick={goBackDrawingTrainLine}>
          <RiArrowGoBackFill />
        </div>
        <div css={widgetIconStyle('#fa5252')} onClick={cancelDrawingTrainLine}>
          <ImCancelCircle />
        </div>
      </div>
    )

  return null
}

const helperWidgetStyle = css`
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

export default HelperWidget
