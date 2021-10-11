import { Fragment, FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'
import Display from './Layout/Display'

const App: FunctionComponent = function () {
  return (
    <Fragment>
      <Global styles={globalStyle} />
      <Display />
    </Fragment>
  )
}

const globalStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
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
