import { useState, useEffect, useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { useGetCoordinateSystemCurrentMode } from 'state/coordinateSystem/coordinateSystemCurrentModeState'
import { TrainPlatformType } from 'state/train/trainPlatformState'
import { useGetTrainForm } from 'state/sideBar/trainFormState'
import TrainPlatform from 'components/CoordinateSystem/TrainPlatform'

type NodeProps = {
  row: number
  column: number
  trainPlatform: TrainPlatformType | null
}

const Node: FunctionComponent<NodeProps> = function ({
  row,
  column,
  trainPlatform,
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const mode = useGetCoordinateSystemCurrentMode()
  const {
    selectedTrainLine: { color },
    trainPlatform: { name },
  } = useGetTrainForm()
  const [visibleTrainPreview, setVisibleTrainPreview] = useState<boolean>(false)

  console.log(row, column, trainPlatform)

  const showTrainPreview = () => setVisibleTrainPreview(true)
  const hideTrainPreview = () => setVisibleTrainPreview(false)

  useEffect(() => {
    if (mode !== 'append' || nodeRef.current === null || trainPlatform !== null)
      return

    nodeRef.current.addEventListener('mouseover', showTrainPreview)
    nodeRef.current.addEventListener('mouseleave', hideTrainPreview)

    return () => {
      nodeRef.current?.removeEventListener('mouseover', showTrainPreview)
      nodeRef.current?.removeEventListener('mouseleave', hideTrainPreview)
    }
  }, [mode])

  return (
    <div ref={nodeRef} css={nodeStyle}>
      {visibleTrainPreview && <TrainPlatform name={name} color={color} />}
    </div>
  )
}

const nodeStyle = css`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  position: relative;
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
