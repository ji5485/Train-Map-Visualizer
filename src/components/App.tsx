import React, { FunctionComponent } from 'react'
import { Global, css, jsx } from '@emotion/react'
import Display from 'components/Layout/Display'
import SideBar from 'components/Layout/SideBar'

const App: FunctionComponent = function () {
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
  display: flex;
  height: 100%;
`

export default App
