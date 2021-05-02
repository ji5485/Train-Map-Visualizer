import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'
import Display from 'components/Display'
// import SideBar from 'components/SideBar'

const App: FunctionComponent = function () {
  return (
    <>
      <Global styles={globalStyle} />
      <Display />
      {/* <SideBar /> */}
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
    position: relative;
  }
`

export default App
