import React from "react";
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { phoneCall, phoneMessage } from "../helper/phone";
import './information.css';

export function Impormation() {
  return (
    <section className="information-section">
      <h1>초대합니다.</h1>
      <div className="information-text">
        <p>여름에 처음만나</p>
        <p>가을에 연애하고</p>
        <p>겨울에 결혼하여</p>
        <p>이제 봄날의 축복과 함께</p>
        <p>행복의 꽃길을 걸으려 합니다.</p>
        <p>귀한 발걸음 하시여 저희의</p>
        <p>사계절을 위해 축하해 주세요.</p>
      </div>
      <div className="contact-wrap">
        <div className="contact-box">
          <span>
            <p>황창석 · 김진연 의 장남</p>
          </span>
          <span>
            <b>황종옥</b>
            <i onClick={() => phoneCall('01050541679')} >
              <FontAwesomeIcon icon={faPhoneAlt}/>
            </i>
            {/* <i onClick={() => phoneMessage('01050541679')}>메시지</i> */}
          </span>
        </div>
        <div className="contact-box">
          <span>
            <p>(故)한인열 · 전혜정 의 장녀</p>
          </span>
          <span>
            <b>한단비</b>
            <i onClick={() => phoneCall('01064153256')}>
              <FontAwesomeIcon icon={faPhoneAlt}/>
            </i>
            {/* <i onClick={() => phoneMessage('01064153256')}>메시지</i> */}
          </span>
        </div>
      </div>
    </section>
  )
}