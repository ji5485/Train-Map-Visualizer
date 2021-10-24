import { Fragment, FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'
import { Helmet } from 'react-helmet'
import Display from './Layout/Display'

const App: FunctionComponent = function () {
  return (
    <Fragment>
      <Helmet>
        <title>Train Map Visualizer</title>
        <link rel="icon" href="favicon.ico" />
        <link rel="canonical" href="https://train-map-visualizer.surge.sh" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta
          name="description"
          content="You can draw the train route map as you want, and simulate based on your train route map!"
        />
      </Helmet>
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
