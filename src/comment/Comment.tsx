import { useState, useCallback } from 'react';

export function Comment() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, [])

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, [])

  const onChangeComment = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, [])

  return (
    <section>
      <form action='api주소'>
        <span>
          <p>이름: </p>
          <input type="text" name="name" value={name} onChange={onChangeName} />
        </span>
        <span>
          <p>비밀번호: </p>
          <input type="password" name="password" value={password} onChange={onChangePassword} />
        </span>
        <textarea name="comment" cols={30} rows={5} value={comment} onChange={onChangeComment} />
        <input type="submit" value="축하하기" />
      </form>
    </section>
  )
}