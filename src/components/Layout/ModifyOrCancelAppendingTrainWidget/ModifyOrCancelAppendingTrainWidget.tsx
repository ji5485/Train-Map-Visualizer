import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import useModifyOrCancelAppendingTrain from 'hooks/useModifyOrCancelAppendingTrain'
import { useGetCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'
import { RiQuillPenFill } from 'react-icons/ri'
import { IoTrashBin } from 'react-icons/io5'

const ModifyOrCancelAppendingTrainWidget: FunctionComponent = function () {
  const mode = useGetCoordinateSystemCurrentMode()
  const { modify, cancel } = useModifyOrCancelAppendingTrain()

  if (mode !== 'append') return null

  return (
    <div css={modifyOrCancelAppendingWidgetStyle}>
      <div css={widgetIconStyle('#69db7c')} onClick={modify}>
        <RiQuillPenFill />
      </div>
      <div css={widgetIconStyle('#fa5252')} onClick={cancel}>
        <IoTrashBin />
      </div>
    </div>
  )
}

const modifyOrCancelAppendingWidgetStyle = css`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: 200px;
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

export default ModifyOrCancelAppendingTrainWidget
