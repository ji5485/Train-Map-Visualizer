import { atom, useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { CoordinateSystemCurrentModeType } from '../../types/CoordinateSystem.types'
import { Getter, Setter, GetterAndSetter } from '../../types/RecoilMethods.types'

const coordinateSystemCurrentModeAtom = atom<CoordinateSystemCurrentModeType>({
  key: 'coordinateSystemCurrentMode',
  default: 'hand',
})

export const useGetCoordinateSystemCurrentMode =
  (): Getter<CoordinateSystemCurrentModeType> =>
    useRecoilValue(coordinateSystemCurrentModeAtom)

export const useSetCoordinateSystemCurrentMode =
  (): Setter<CoordinateSystemCurrentModeType> =>
    useSetRecoilState(coordinateSystemCurrentModeAtom)

export const useStateCoordinateSystemCurrentMode =
  (): GetterAndSetter<CoordinateSystemCurrentModeType> =>
    useRecoilState(coordinateSystemCurrentModeAtom)
