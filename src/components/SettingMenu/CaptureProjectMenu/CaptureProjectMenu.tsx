import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { MdNoteAdd } from 'react-icons/md'

const CaptureProjectMenu: FunctionComponent = function () {
  return (
    <div css={captureProjectMenuStyle}>
      <MdNoteAdd />
      <span>노선도 이미지 저장</span>
    </div>
  )
}

const captureProjectMenuStyle = css`
  display: flex;
  align-items: center;
  margin: 0 -10px;
  padding: 10px;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: 0.15s background;

  &:hover {
    background: #e9ecef;
  }

  svg {
    font-size: 1.3rem;
  }

  span {
    margin-left: 5px;
  }
`

export default CaptureProjectMenu
