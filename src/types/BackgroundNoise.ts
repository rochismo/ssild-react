import { ElementType } from 'react'

type SliderConfig = {
  trackBg: string
  trackRangeBg: string
  thumbBg: string
  thumbIcon: ElementType | undefined
}

export type BackgroundNoise = {
  slug: string
  displayName: string
  slider: SliderConfig
}
