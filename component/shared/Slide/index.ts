'use client';

import Track from './Track';
import Item from './Item';
import Arrows from './Arrows';
import Dots from './Dots';
import Content from './Content';
import Root from './Root';

export const Slide = Object.assign(Root, {
  Track: Track,
  Item: Item,
  Arrows: Arrows,
  Dots: Dots,
  Content: Content,
});
