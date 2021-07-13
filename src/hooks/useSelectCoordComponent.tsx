import { useEffect, MutableRefObject } from 'react'
import { useStateCoordinateSystemCurrentMode } from 'state/CoordinateSystem/coordinateSystemCurrentModeState'

type useSelectCoordComponentType = void

export default function useSelectCoordComponent(
  type: 'TrainPlatform' | 'TrainLine',
  coordComponentRef: MutableRefObject<HTMLDivElement | null>,
): useSelectCoordComponentType {
  const [currentMode] = useStateCoordinateSystemCurrentMode()

  const handleClick = () => {
    console.log(type, 'Hello')
  }

  useEffect(() => {
    if (currentMode !== 'select' || coordComponentRef === null) return

    coordComponentRef.current?.addEventListener('click', handleClick, {
      once: true,
    })

    return () =>
      coordComponentRef.current?.removeEventListener('click', handleClick)
  }, [currentMode])
}
