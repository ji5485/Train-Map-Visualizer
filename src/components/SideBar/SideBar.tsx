import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useStateSideBar } from 'state/sideBar/sideBarState'

const SideBar: FunctionComponent = function () {
  const [{ isOpen }, setSideBar] = useStateSideBar()

  return (
    <div css={sideBarStyle} style={{ width: `${isOpen ? 400 : 0}px` }}>
      <div onClick={() => setSideBar(prev => ({ ...prev, isOpen: false }))}>
        close
      </div>
    </div>
  )
}

const sideBarStyle = css`
  height: 100%;
  background: #ffffff;
  transition: width 0.5s cubic-bezier(0, 0, 0.3, 1);
`

export default SideBar
