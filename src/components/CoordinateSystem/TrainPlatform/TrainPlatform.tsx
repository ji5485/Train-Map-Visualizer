import { FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'

type TrainPlatformProps = {
  name: string
  color: string
}

const TrainPlatform: FunctionComponent<TrainPlatformProps> = function ({
  name,
}) {
  return <div css={trainPlatformStyle}>{name}</div>
}

const trainPlatformStyle = css`
  width: 50px;
  height: 50px;
  border: 1px solid black;
`

export default TrainPlatform
