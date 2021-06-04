import { useEffect, useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'
// import { useGetTrainForm } from 'state/sideBar/trainFormState'

const Node: FunctionComponent = function () {
  const nodeRef = useRef<HTMLDivElement>(null)
  const mode = useGetCoordinateSystemCurrentMode()
  // const {
  //   selectedTrainLine: { id, name, color },
  //   trainPlatform: { name },
  // } = useGetTrainForm()

  // const showTrainPreview = () => {}

  useEffect(() => {
    if (mode !== 'append' || nodeRef.current === null) return

    const print = () => console.log('abc')

    nodeRef.current.addEventListener('mouseover', print)

    return () => nodeRef.current?.removeEventListener('mouseover', print)
  }, [mode])

  return <div ref={nodeRef} css={nodeStyle} />
}

const nodeStyle = css`
  flex-shrink: 0;
  width: 120px;
  height: 120px;

  background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 0.8px),
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) calc(50% + 0.8px),
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      to top,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 0.8px),
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 0) calc(50% + 0.8px),
      rgba(0, 0, 0, 0) 100%
    );
`

export default Node
