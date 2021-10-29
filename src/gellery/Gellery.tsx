import { useEffect, useState } from 'react';
import Slider, {CustomArrowProps} from 'react-slick';
import { getImageUrl } from '../helper/getImageUrl';
import './gellery.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  // adaptiveHeight: true
};

function NextArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  const calssNames = `${className} next-arrow`

  return (
    <div
      className={calssNames}
      onClick={onClick}
    />
  );
}

function PrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  const calssNames = `${className} prev-arrow`

  return (
    <div
      className={calssNames}
      onClick={onClick}
    />
  );
}

export function Gellery() {
  const [ ImageUrlList, setImageUrlList ] = useState<string[]>([]);

  useEffect(() => {
    getImageUrl().then((urls) => setImageUrlList(urls));
  },[])

  return (
    <section className="gallery-section">
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