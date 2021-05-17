import React, { FunctionComponent } from 'react'
import { Global, css, jsx } from '@emotion/react'
import Display from 'components/Display'
import SideBar from 'components/SideBar'
// import { useGetSideBar } from 'state/sideBarState'

const App: FunctionComponent = function () {
  // const { isOpen } = useGetSideBar()

  return (
    <>
      <Global styles={globalStyle} />
      <div css={appContainerStyle}>
        <Display />
        <SideBar />
      </div>
    </>
  )
}

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  #root {
    overflow: hidden;
    position: relative;
  }
`

const appContainerStyle = css`
  display: grid;
  grid-template-columns: 1fr 400px;
  height: 100%;
`

export default App
