import './Main.css';

export function Main() {
  return (
    <section>
      <div id="leaves">
        <img src="/flower/flower1.png" alt="꽃잎"></img>
        <img src="/flower/flower2.png" alt="꽃잎"></img>
        <img src="/flower/flower3.png" alt="꽃잎"></img>
        <img src="/flower/flower4.png" alt="꽃잎"></img>
        <img src="/flower/flower5.png" alt="꽃잎"></img>
        <img src="/flower/flower6.png" alt="꽃잎"></img>
        <img src="/flower/flower7.png" alt="꽃잎"></img>
        <img src="/flower/flower8.png" alt="꽃잎"></img>
        <img src="/flower/flower9.png" alt="꽃잎"></img>
        <img src="/flower/flower10.png" alt="꽃잎"></img>
      </div>
      <div className='main_img' style={{backgroundImage: `url('/flower/flower-no-last.png')`}}/>
      <p>
        황종옥 한단비 12/04
      </p>
      <p>
        수원 엠배서더 이비스 호텔 오후 5시
      </p>
    </section>
  )
}