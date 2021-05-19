import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useStateSideBar } from 'state/sideBar/sideBarState'
import { BiXCircle } from 'react-icons/bi'

const SideBar: FunctionComponent = function () {
  const [{ isOpen }, setSideBar] = useStateSideBar()

  const closeSideBar = () => setSideBar(prev => ({ ...prev, isOpen: false }))

  return (
    <div css={sideBarStyle} style={{ width: `${isOpen ? 400 : 0}px` }}>
      <BiXCircle css={closeIconStyle} onClick={closeSideBar} />
      <div css={sideBarContentStyle}>contents</div>
    </div>
  )
}

const sideBarStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 50px 0;
  background: #ffffff;
  transition: width 0.5s cubic-bezier(0, 0, 0.1, 1.1);
`

const closeIconStyle = css`
  margin: 0 0 20px 30px;
  font-size: 2rem;
  cursor: pointer;
`

const sideBarContentStyle = css`
  flex: 1;
  padding: 0 30px;
`

export default SideBar
