import {
  atom,
  useRecoilState,
  useResetRecoilState,
  Resetter,
  useRecoilValue,
} from 'recoil'
import {
  PreviewTrainLineTraceType,
  PreviewTrainLineStackType,
} from 'types/Train.types'
import { Getter, Setter } from 'types/RecoilMethods.types'
import { TRAIN_MATRIX_MAX_LENGTH } from 'utils/constants'

const previewTrainLineTraceAtom = atom<PreviewTrainLineTraceType>({
  key: 'previewTrainLineTrace',
  default: new Array<boolean[]>(TRAIN_MATRIX_MAX_LENGTH).fill(
    new Array<boolean>(TRAIN_MATRIX_MAX_LENGTH).fill(false),
  ),
})

const previewTrainLineStackAtom = atom<PreviewTrainLineStackType>({
  key: 'previewTrainLineStack',
  default: [],
})

export const useGetPreviewTrainLineTrace = (): Getter<PreviewTrainLineTraceType> =>
  useRecoilValue(previewTrainLineTraceAtom)

export const useManagePreviewTrainLineTrace = (): [
  Getter<PreviewTrainLineTraceType>,
  Setter<PreviewTrainLineTraceType>,
  Resetter,
] => {
  const [previewTrainLineTrace, setPreviewTrainLineTrace] = useRecoilState(
    previewTrainLineTraceAtom,
  )
  const resetPreviewTrainLineTrace = useResetRecoilState(
    previewTrainLineTraceAtom,
  )

  return [
    previewTrainLineTrace,
    setPreviewTrainLineTrace,
    resetPreviewTrainLineTrace,
  ]
}

export const useManagePreviewTrainLineStack = (): [
  Getter<PreviewTrainLineStackType>,
  Setter<PreviewTrainLineStackType>,
  Resetter,
] => {
  const [previewTrainLineStack, setPreviewTrainLineStack] = useRecoilState(
    previewTrainLineStackAtom,
  )
  const resetPreviewTrainLineStack = useResetRecoilState(
    previewTrainLineStackAtom,
  )

  return [
    previewTrainLineStack,
    setPreviewTrainLineStack,
    resetPreviewTrainLineStack,
  ]
}
