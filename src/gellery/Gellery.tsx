import Slider from 'react-slick';
import { getThumbnail } from '../firebase/storage';

export function Gellery() {
  getThumbnail();
  return (
    <section>
      <h1>사진첩</h1>
      <Slider>

      </Slider>
    </section>
  )
}