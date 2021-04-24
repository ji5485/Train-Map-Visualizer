import { atom } from 'recoil'

export const zoomState = atom<number>({
  key: 'zoomState',
  default: 1,
})

// export const setZoomState = useSetRecoilState<number>(zoomState)
