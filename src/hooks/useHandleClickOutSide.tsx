import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react'

type useHandleClickOutSideType = {
  ref: MutableRefObject<HTMLDivElement | null>
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  showComponent: () => void
  hideComponent: () => void
}

export default function useHandleClickOutSide(): useHandleClickOutSideType {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const showComponent = () => setIsVisible(true)
  const hideComponent = () => setIsVisible(false)

  const handleClickOutSide = (event: MouseEvent) => {
    if (ref.current === null) return
    if (!ref.current.contains(event.target as Node)) hideComponent()
  }

  useEffect(() => {
    if (isVisible)
      window.document.addEventListener('mousedown', handleClickOutSide)

    return () =>
      window.document.removeEventListener('mousedown', handleClickOutSide)
  }, [isVisible])

  return { ref, isVisible, setIsVisible, showComponent, hideComponent }
}
