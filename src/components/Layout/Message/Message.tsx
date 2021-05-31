import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'

const MESSAGE_TYPE = {
  append: '적절한 위치에 지하철 역을 추가해주세요.',
  line: '지하철 사이에 선로를 추가해주세요.',
}

const Message: FunctionComponent = function () {
  return <div css={messageStyle}>{MESSAGE_TYPE['append']}</div>
}

const messageStyle = css``

export default Message
