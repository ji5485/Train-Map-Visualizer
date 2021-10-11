import { atom, useRecoilState, Resetter, useResetRecoilState } from 'recoil'
import {
  TrainMapGraphType,
  TrainMapGraphEdgeType,
} from '../../types/Train.types'
import { Getter, Setter } from '../../types/RecoilMethods.types'
import { TRAIN_MATRIX_MAX_LENGTH } from '../../utils/constants'

const trainMapGraphAtom = atom<TrainMapGraphType>({
  key: 'trainMapGraph',
  default: new Array<(TrainMapGraphEdgeType | null)[]>(
    TRAIN_MATRIX_MAX_LENGTH * TRAIN_MATRIX_MAX_LENGTH,
  ).fill(
    new Array<TrainMapGraphEdgeType | null>(
      TRAIN_MATRIX_MAX_LENGTH * TRAIN_MATRIX_MAX_LENGTH,
    ).fill(null),
  ),
})

const trainMapGraphEdgeAtom = atom<TrainMapGraphEdgeType>({
  key: 'trainMapGraphEdge',
  default: {
    id: '',
    time: 0,
  },
})

export const useManageTrainMapGraph = (): {
  trainMapGraph: Getter<TrainMapGraphType>
  setTrainMapGraph: Setter<TrainMapGraphType>
  resetTrainMapGraph: Resetter
} => {
  const [trainMapGraph, setTrainMapGraph] = useRecoilState(trainMapGraphAtom)
  const resetTrainMapGraph = useResetRecoilState(trainMapGraphAtom)

  return { trainMapGraph, setTrainMapGraph, resetTrainMapGraph }
}

export const useManageTrainMapGraphEdge = (): {
  trainMapGraphEdge: Getter<TrainMapGraphEdgeType>
  setTrainMapGraphEdge: Setter<TrainMapGraphEdgeType>
  resetTrainMapGraphEdge: Resetter
} => {
  const [trainMapGraphEdge, setTrainMapGraphEdge] = useRecoilState(
    trainMapGraphEdgeAtom,
  )
  const resetTrainMapGraphEdge = useResetRecoilState(trainMapGraphEdgeAtom)

  return { trainMapGraphEdge, setTrainMapGraphEdge, resetTrainMapGraphEdge }
}
