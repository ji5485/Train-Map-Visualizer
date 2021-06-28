import { atom, useRecoilState, Resetter, useResetRecoilState } from 'recoil'
import { CoordinateSystemDrawingLineStatusType } from 'types/CoordinateSystem.types'
import { Getter, Setter } from 'types/RecoilMethods.types'

const coordinateSystemDrawingLineStatusAtom = atom<CoordinateSystemDrawingLineStatusType>(
  {
    key: 'coordinateSystemDrawingLineStatus',
    default: {
      isDrawing: false,
      previewTrainLineColor: 'blue',
      currentNode: 0,
    },
  },
)

export const useManageCoordinateSystemDrawingLineStatus = (): [
  Getter<CoordinateSystemDrawingLineStatusType>,
  Setter<CoordinateSystemDrawingLineStatusType>,
  Resetter,
] => {
  const [drawingLineStatus, setDrawingLineStatus] = useRecoilState(
    coordinateSystemDrawingLineStatusAtom,
  )
  const resetDrawingLineStatus = useResetRecoilState(
    coordinateSystemDrawingLineStatusAtom,
  )

  return [drawingLineStatus, setDrawingLineStatus, resetDrawingLineStatus]
}
