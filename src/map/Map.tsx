import { useEffect, useMemo, useRef } from "react"
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './map.css';

const LATITUDE = 37.259270289658666; // 위도
const LONGITUDE = 127.03127376600385; // 경도
const kakaoMap = `https://map.kakao.com/link/to/이비스앰배서더수원,${LATITUDE},${LONGITUDE}`;
const naverMap = 'https://map.naver.com/v5/directions/-/14141062.057572443,4475309.6872653365,%EC%9D%B4%EB%B9%84%EC%8A%A4%20%EC%95%B0%EB%B0%B0%EC%84%9C%EB%8D%94%20%EC%88%98%EC%9B%90,12819422,PLACE_POI/-/transit?c=14120925.1409244,4513496.7517718,15,0,0,0,dh';


export function Map() {
  const kakaoMapContainer = useRef(null); //지도를 담을 영역의 DOM 레퍼런스
  const kakao = (window as any).kakao;

  const options = useMemo(() => {
    return {
      center: new kakao.maps.LatLng(LATITUDE, LONGITUDE), //지도의 중심좌표.
      level: 2, //지도의 레벨(확대, 축소 정도)
    };
  }, [kakao.maps.LatLng])

  useEffect(() => {
    const map = new kakao.maps.Map(kakaoMapContainer.current, options); //지도 생성 및 객체 리턴

    const markerPosition = new kakao.maps.LatLng(LATITUDE, LONGITUDE);  // 마커가 포지션될 위치
    const marker = new kakao.maps.Marker({
      position: markerPosition
    }); // 마커 생성
    
    marker.setMap(map); // 마커가 지도 위에 표시되도록 설정합니다
  }, [options, kakao.maps]);

  return (
    <section>
      <h1 className="map-title">오시는 길</h1>
      <div id="map" style={{ width: "100%", height: "400px" }} ref={kakaoMapContainer} />
      <div className="map-icon-wrap">
        <span className="naver-icon-wrap">
          <a className="map-icon-circle" href={kakaoMap} target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="naver-icon" icon={faMapMarkerAlt} size="lg"/>
          </a>
          <p>네이버</p>
        </span>
        <span>
          <a className="map-icon-circle" href={naverMap} target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="kakao-icon" icon={faMapMarkerAlt} size="lg"/>
          </a>
          <p>카카오</p>
        </span>
      </div>
      <div className="location-text-wrap">
        <div>
          <h2>경기 수원시 팔달구 권광로 132</h2>
          {/* <h2>(경기 수원시 팔달구 인계동 1132-12)</h2> */}
          <h2>이비스 엠배서더 수원</h2>
          <p className="phone-number">031-230-5500</p>
        </div>
        <div>
          <h2 className="title-text">지하철</h2>
          <p className="sub-text">
            [분당선 수원시청역] 2번 출구
          </p>
        </div>
        <div>
          <h2 className="title-text">승용차</h2>
          <p className="sub-text">
            [영동고속도로 이용시]
          </p>
          <p className="sub-text">
            동수원IC → 광주/수지방면(P턴) → <br /> 300m 직진 후 월드컵경기장 방향 우회전 → <br />직진 후 고가도록 진입 → 수원시청역 사거리 지나 200m 후 좌측
          </p>
          <br />
          <p className="sub-text">
            [경부고속도록 이용시]
          </p>
          <p className="sub-text">
            수원IC → 수원방향 좌회전(42번 국도) → <br /> 고가도로 밑 공항버스터미널 앞 좌회전 → <br />수원시청역 사거리 지나 200m 후 좌측
          </p>
        </div>
        <div>
          <h2 className="title-text">전세 버스</h2>
          <p className="sub-text">10시 출발 / 창녕유치원 앞(구 창락초등학교)</p>
          <p className="sub-text">10시 30분 출발 / 창녕 농협 앞 출발</p>
        </div>
      </div>
    </section>
  )
}