import { phoneCall, phoneMessage } from "../helper/phone";

export function Impormation() {
  return (
    <section>
      <p>
        여름에 처음만나
      </p>
      <p>
        가을에 연애하고
      </p>
      <p>
        겨울에 결혼하여
      </p>
      <p>
        이제 봄날의 축복과 함께
      </p>
      <p>
        행복의 꽃길을 걸으려 합니다.
      </p>
      <p>
        귀한 발걸음 하시여
      </p>
      <p>
        저희의 사계절을 위해 축하해 주세요.
      </p>
      <div>
        <p>
          <b>황창석</b>
          <b>김진연</b>
          의 장남
          <b>황종옥</b>
          <i onClick={() => phoneCall('01050541679')}>전화 아이콘</i>
          <i onClick={() => phoneMessage('01050541679')}>메시지 아이콘</i>
        </p>
        <p>
          <b>(故)한인열</b>
          <b>전혜정</b>
          의 장녀
          <b>한단비</b>
          <i onClick={() => phoneCall('01064153256')}>전화 아이콘</i>
          <i onClick={() => phoneMessage('01064153256')}>메시지 아이콘</i>
        </p>
      </div>
    </section>
  )
}