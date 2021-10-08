import { atom, useRecoilState, Resetter, useResetRecoilState } from 'recoil'
import { CoordinateSystemDrawingLineStatusType } from 'types/CoordinateSystem.types'
import { Getter, Setter } from 'types/RecoilMethods.types'

const coordinateSystemDrawingLineStatusAtom =
  atom<CoordinateSystemDrawingLineStatusType>({
    key: 'coordinateSystemDrawingLineStatus',
    default: {
      isDrawing: false,
      currentNode: 0,
      startTrainPlatform: null,
      drawingLine: null,
    },
  })

export const useManageCoordinateSystemDrawingLineStatus = (): {
  drawingLineStatus: Getter<CoordinateSystemDrawingLineStatusType>
  setDrawingLineStatus: Setter<CoordinateSystemDrawingLineStatusType>
  resetDrawingLineStatus: Resetter
} => {
  const [drawingLineStatus, setDrawingLineStatus] = useRecoilState(
    coordinateSystemDrawingLineStatusAtom,
  )
  const resetDrawingLineStatus = useResetRecoilState(
    coordinateSystemDrawingLineStatusAtom,
  )

  return { drawingLineStatus, setDrawingLineStatus, resetDrawingLineStatus }
}
