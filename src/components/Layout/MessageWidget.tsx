import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'
import { MESSAGE_TYPE } from 'utils/constants'

const MessageWidget: FunctionComponent = function () {
  const mode = useGetCoordinateSystemCurrentMode()

  if (mode === 'hand') return null

  return <div css={messageWidgetStyle}>{MESSAGE_TYPE[mode]}</div>
}

const messageWidgetStyle = css`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 25px;
  background: #495057;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 800;
  user-select: none;
`

export default MessageWidget
