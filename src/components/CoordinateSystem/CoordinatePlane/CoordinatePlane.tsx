import { useRef, FunctionComponent } from 'react'
import { jsx, css } from '@emotion/react'
import Node from 'components/CoordinateSystem/Node'
import { useGetCoordinatePlaneZoom } from 'state/CoordinateSystem/coordinatePlaneZoomState'
import {
  useGetCoordinatePlaneSize,
  useGetCalculatedCoordinatePlaneSize,
} from 'state/CoordinateSystem/coordinatePlaneSizeState'
import {
  useManageTrainPlatform,
  useManageTrainLine,
} from 'state/Train/TrainMapState'
import useChangeCursor from 'hooks/useChangeCursor'
import useScrollWithMouse from 'hooks/useScrollWithMouse'

const CoordinatePlane: FunctionComponent = function () {
  const coordPlaneRef = useRef<HTMLDivElement | null>(null)
  useChangeCursor(coordPlaneRef)
  useScrollWithMouse(coordPlaneRef)

  const { width, height } = useGetCoordinatePlaneSize()
  const zoom = useGetCoordinatePlaneZoom()
  const {
    width: calculatedWidth,
    height: calculatedHeight,
  } = useGetCalculatedCoordinatePlaneSize()

  const { trainPlatformMatrix } = useManageTrainPlatform()
  const { trainLineMatrix } = useManageTrainLine()

  return (
    <div ref={coordPlaneRef} css={coordPlaneStyle}>
      {width === 0 && height === 0 ? (
        <div css={coordPlaneStyle}>
          <div css={coordPlaneInfoStyle}>
            <img
              src={process.env.PUBLIC_URL + '/img/append_project_image.svg'}
              alt="Append Project"
            />
            새 프로젝트를 생성해주세요.
          </div>
        </div>
      ) : (
        <div
          css={coordPlaneBackgroundStyle}
          style={{
            width: `${calculatedWidth}px`,
            height: `${calculatedHeight}px`,
          }}
        >
          <div
            css={coordPlaneContentStyle}
            style={{
              width: `${width * 120}px`,
              height: `${height * 120}px`,
              transform: `scale(${zoom})`,
            }}
          >
            {[...Array<number>(height).keys()].map(
              (row: number, rowIndex: number) => (
                <div css={rowStyle} key={`row-${row}`}>
                  {[...Array<number>(width).keys()].map(
                    (column: number, columnIndex: number) => {
                      const nodeNumber = width * rowIndex + columnIndex

                      const trainLine = {
                        right:
                          columnIndex !== width - 1
                            ? trainLineMatrix[nodeNumber][nodeNumber + 1]
                            : null,
                        bottom:
                          rowIndex !== height - 1
                            ? trainLineMatrix[nodeNumber][nodeNumber + width]
                            : null,
                      }

                      return (
                        <Node
                          key={`${row}-${column}`}
                          row={row}
                          column={column}
                          nodeNumber={nodeNumber}
                          trainPlatform={trainPlatformMatrix[row][column]}
                          trainLine={trainLine}
                        />
                      )
                    },
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const coordPlaneStyle = css`
  flex: 1;
  display: flex;
  overflow: scroll;
  height: 100%;
  background: #e9ecef;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
  }
`

const coordPlaneBackgroundStyle = css`
  flex-shrink: 0;
  display: flex;
  margin: auto;
  padding: 100px 150px;
  box-sizing: initial;
`

const coordPlaneInfoStyle = css`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  font-size: 2rem;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.3);
  user-select: none;

  img {
    width: 300px;
    margin-bottom: 30px;
  }
`

const coordPlaneContentStyle = css`
  background: #ffffff;
  transform-origin: 0% 0%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`

const rowStyle = css`
  display: flex;
`

export default CoordinatePlane
