import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'
import Display from 'components/Display'
import SideBar from 'components/SideBar'
import ToolBox from 'components/ToolBox'

const App: FunctionComponent = function () {
  return (
    <>
      <Global styles={globalStyle} />
      <Display />
      <SideBar />
      <ToolBox />
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
    display: grid;
    grid-template-columns: 1fr 400px;
    position: relative;
  }
`

export default App
