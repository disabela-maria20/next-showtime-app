import { SlideTrack } from './SlideTrack'
import { SlideItem } from './SlideItem'
import { SlideArrows } from './SlideArrows'
import { SlideDots } from './SlideDots'
import { SlideContent } from './SlideContent'

export const Slide = Object.assign(SlideRoot, {
  Track: SlideTrack,
  Item: SlideItem,
  Arrows: SlideArrows,
  Dots: SlideDots,
  Content: SlideContent,
})
