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
  hideComponent: (event: MouseEvent) => void
}

export default function useHandleClickOutSide(): useHandleClickOutSideType {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const showComponent = () => setIsVisible(true)

  const hideComponent = (event: MouseEvent) => {
    if (ref.current === null) return
    if (!ref.current.contains(event.target as Node)) setIsVisible(false)
  }

  useEffect(() => {
    if (isVisible) window.document.addEventListener('mousedown', hideComponent)

    return () => window.document.removeEventListener('mousedown', hideComponent)
  }, [isVisible])

  return { ref, isVisible, setIsVisible, showComponent, hideComponent }
}
