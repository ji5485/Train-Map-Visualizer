import React, { FunctionComponent } from 'react'
import { Global, css, jsx } from '@emotion/react'
import Display from 'components/Layout/Display'

const App: FunctionComponent = function () {
  return (
    <>
      <Global styles={globalStyle} />
      <Display />
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

export default App
