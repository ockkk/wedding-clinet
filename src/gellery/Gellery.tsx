import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getImageUrl } from '../helper/getImageUrl';
import './gellery.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export function Gellery() {
  const [ ImageUrlList, setImageUrlList ] = useState<string[]>([]);

  useEffect(() => {
    getImageUrl().then((urls) => setImageUrlList(urls));
  },[])

  return (
    <section>
      <h1>사진첩</h1>
      <Slider className="slide" {...settings}>
        {ImageUrlList.map(url => {
          return (
            <div className="image-wrap">
              <img className="image" src={url} alt="이미지"/>
            </div>
          )
        })}
      </Slider>
    </section>
  )
}