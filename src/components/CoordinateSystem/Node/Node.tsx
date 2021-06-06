import { useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import { TrainPlatformType } from 'state/train/trainPlatformState'
import TrainPlatform from 'components/CoordinateSystem/TrainPlatform'
import useManageTrainPlatform from 'hooks/useManageTrainPlatform'

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
  const nodeRef = useRef<HTMLDivElement | null>(null)
  const {
    visibleTrainPreview,
    previewTrainPlatform: { platformName, lineName, lineColor },
  } = useManageTrainPlatform(row, column, nodeRef, trainPlatform)

  return (
    <div ref={nodeRef} css={nodeStyle}>
      {visibleTrainPreview && (
        <TrainPlatform
          platformName={platformName}
          lineName={lineName}
          lineColor={lineColor}
          isPreview
          isTransferPlatform={false}
        />
      )}

      {trainPlatform !== null && (
        <TrainPlatform
          platformName={trainPlatform.name}
          lineName={
            trainPlatform.isTransferPlatform
              ? 'teal'
              : trainPlatform.line[0].name
          }
          lineColor={
            trainPlatform.isTransferPlatform
              ? 'teal'
              : trainPlatform.line[0].color
          }
          isPreview={false}
          isTransferPlatform={trainPlatform.isTransferPlatform}
        />
      )}
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
