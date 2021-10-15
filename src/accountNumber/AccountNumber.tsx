import { useRef } from 'react';
import { textCopy } from '../helper/textCopy';

export function AccountNumber() {
  const textInput = useRef<HTMLParagraphElement>(null)

  return (
    <section>
      <h1>마음 전하는 곳</h1>
      <div>
        <p>신랑측 혼주 계좌번호</p>
        <div>
          <p ref={textInput}>12312313</p>
          <button onClick={() => textCopy(textInput.current?.innerText)}>
            복사하기
        </button>
        </div>
      </div>
      <div>
        <p>신부측 혼주 계좌번호</p>
        <button>
          복사하기
        </button>
      </div>
      <div>
        <p>신랑측 계좌번호</p>
        <button>
          복사하기
        </button>
      </div>
      <div>
        <p>신랑측 계좌번호</p>
        <button>
          복사하기
        </button>
      </div>
    </section>
  )
}