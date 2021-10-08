import { atom, useRecoilState, Resetter, useResetRecoilState } from 'recoil'
import { CoordinateSystemPathHighlightType } from 'types/CoordinateSystem.types'
import { Getter, Setter } from 'types/RecoilMethods.types'

const coordinateSystemPathHighlightAtom =
  atom<CoordinateSystemPathHighlightType>({
    key: 'coordinateSystemPathHighlight',
    default: {
      highlight: false,
      highlightedComponents: {
        platforms: [],
        lines: [],
      },
    },
  })

export const useManageCoordinateSystemPathHighlight = (): {
  coordinateSystemPathHighlight: Getter<CoordinateSystemPathHighlightType>
  setCoordinateSystemPathHighlight: Setter<CoordinateSystemPathHighlightType>
  resetCoordinateSystemPathHighlight: Resetter
} => {
  const [coordinateSystemPathHighlight, setCoordinateSystemPathHighlight] =
    useRecoilState(coordinateSystemPathHighlightAtom)
  const resetCoordinateSystemPathHighlight = useResetRecoilState(
    coordinateSystemPathHighlightAtom,
  )

  return {
    coordinateSystemPathHighlight,
    setCoordinateSystemPathHighlight,
    resetCoordinateSystemPathHighlight,
  }
}
