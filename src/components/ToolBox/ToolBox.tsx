import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useSetSideBar } from 'state/sideBarState'
import ToolIcon from 'components/ToolIcon'

const ToolBox: FunctionComponent = function () {
  const setSideBar = useSetSideBar()

  return (
    <div css={toolBoxStyle}>
      <ToolIcon type="hand" onClick={() => setSideBar({ isOpen: true })} />
      <ToolIcon type="select" onClick={() => console.log('select')} />
      <ToolIcon type="append" onClick={() => console.log('append')} />
      <ToolIcon type="line" onClick={() => console.log('line')} />
    </div>
  )
}

const toolBoxStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: fixed;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);

  width: 50px;
  height: 350px;
  padding: 30px 0;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
`

export default ToolBox
