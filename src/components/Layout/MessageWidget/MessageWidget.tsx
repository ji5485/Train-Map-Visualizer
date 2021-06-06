import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'

const MESSAGE_TYPE = {
  append: '적절한 위치에 지하철 역을 추가해주세요.',
  select: '지하철 역 또는 선로를 선택해 속성을 변경할 수 있습니다.',
  line: '지하철 역 사이에 선로를 추가해주세요.',
}

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
