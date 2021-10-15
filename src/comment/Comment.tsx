import { useState, useCallback, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { CommentList } from './comment.model';
import { getComment } from './comment.service';


export function Comment() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [commentList, setCommentList] = useState<CommentList[]>([]);

  useEffect(() => {
    getComment();
  }, [])

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, [])

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, [])

  const onChangeComment = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, [])


  const addComment = async () => {
    await addDoc(collection(db, "comment"), {
      name,
      comment,
      password,
    });
    getComment();
  }

  const getComment = async () => {
    const querySnapshot = await getDocs(collection(db, "comment"));
    const commentList: CommentList[] = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().comment}`);
      commentList.push({
        key: doc.id,
        name: doc.data().name,
        comment: doc.data().comment,
        password: doc.data().password,
      })
    });
    
    setCommentList(commentList);
  }

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
      <div>
        {commentList.map(comment => (
          <div key={comment.key}>
            <p>{comment.name}</p>
            <span>{comment.comment}</span>
          </div>
        ))}
      </div>
    </section>
  )
}