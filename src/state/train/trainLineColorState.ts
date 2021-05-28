import {
  atom,
  useRecoilValue,
  SetterOrUpdater,
  useSetRecoilState,
  selectorFamily,
} from 'recoil'

const TRAIN_LINE_COLOR = {
  indigo: '#4263eb',
  teal: '#20c997',
  orange: '#fd7e14',
  blue: '#1864ab',
  violet: '#9775fa',
  red: '#fa5252',
  yellow: '#fcc419',
  pink: '#e64980',
  lime: '#5c940d',
}

const trainLineColorAtom = atom<TRAIN_LINE_COLOR>({
  key: 'trainLineColor',
  default: TRAIN_LINE_COLOR,
})
