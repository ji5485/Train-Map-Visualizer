import { createElement, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useStateSideBar } from 'state/sideBar/sideBarState'
import { BiXCircle } from 'react-icons/bi'
import AppendTrainForm from 'components/AppendTrain/AppendTrainForm'

const SIDE_BAR_CONTENT = {
  select_train: AppendTrainForm,
  select_line: AppendTrainForm,
  append: AppendTrainForm,
}

const SideBar: FunctionComponent = function () {
  const [{ isOpen, menu }, setSideBar] = useStateSideBar()
  console.log(menu)

  const closeSideBar = () => setSideBar(prev => ({ ...prev, isOpen: false }))

  return (
    <div
      css={sideBarStyle}
      style={{ width: `${isOpen ? 400 : 0}px`, opacity: isOpen ? 1 : 0 }}
    >
      <BiXCircle css={closeIconStyle} onClick={closeSideBar} />
      <div css={sideBarContentStyle}>
        {menu !== null && createElement(SIDE_BAR_CONTENT[menu])}
      </div>
    </div>
  )
}

const sideBarStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 50px 0;
  background: #ffffff;
  transition: all 0.5s cubic-bezier(0, 0, 0.1, 1.1);
`

const closeIconStyle = css`
  margin: 0 0 50px 40px;
  font-size: 2rem;
  cursor: pointer;
`

const sideBarContentStyle = css`
  flex: 1;
  padding: 0 40px;
`

export default SideBar