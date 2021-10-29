import { useState, useCallback, useEffect, useRef } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useForm } from "react-hook-form";
import './comment.css';
import { parseCreatedTime } from '../helper/parseCreatedTime';
interface CommentList {
  key: string;
  name: string;
  password: string;
  comment: string;
  createdTime: number;
}

export function Comment() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [commentList, setCommentList] = useState<CommentList[]>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [deletePassword, setDeletePassword] = useState<string>('');
  const [selectCommentKey, setSelectCommentKey] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const commentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    getComment();
  }, []);

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const onChangeComment = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

  const openDeleteModal = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectCommentKey(e.currentTarget.id);
    setIsDelete(true);
    setDeletePassword('');
  }, []);

  const closeDeleteModal = useCallback(() => {
    setSelectCommentKey('');
    setIsDelete(false);
    setDeletePassword('');
  }, []);

  const onChangeDeletePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDeletePassword(e.target.value);
  }, []);


  const addComment = async () => {
    if(name.length === 0) {
      alert('이름을 입력해 주세요');
      return;
    }

    if(comment.length === 0) {
      alert('축하글을 입력해 주세요');
      return;
    }

    if(password.length === 0) {
      alert('비밀번호를 입력해 주세요');
      return;
    }

    const createdTime = new Date().getTime();
    await addDoc(collection(db, "comment"), {
      name,
      comment,
      password,
      createdTime,
    });
    setName('');
    setPassword('');
    setComment('');
    getComment();
  };

  const getComment = async () => {
    const querySnapshot = await getDocs(collection(db, "comment"));
    const commentList: CommentList[] = [];
    querySnapshot.forEach((doc) => {
      commentList.push({
        key: doc.id,
        name: doc.data().name,
        comment: doc.data().comment,
        password: doc.data().password,
        createdTime: doc.data().createdTime,
      })
    });

    const sortedCommentList = commentList.sort((acc, curr) => curr.createdTime - acc.createdTime);
    setCommentList(sortedCommentList);
  };

  const onDeleteComment = async () => {
    const docRef = doc(db, "comment", selectCommentKey);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("No such document!");
    }

    const findCommnet = docSnap.data();
    if (findCommnet !== undefined && deletePassword === findCommnet.password) {
      await deleteDoc(doc(db, 'comment', selectCommentKey));
      getComment();
      closeDeleteModal();
    } else {
      alert('비밀번호가 일치하지 않습니다.')
    }
  };

  useEffect(() => {
    if (commentRef === null || commentRef.current === null) {
      return;
    }
    commentRef.current.style.height = '38px';
    commentRef.current.style.height = commentRef.current.scrollHeight + 'px';
  }, []);

  const handleResizeHeight = useCallback(() => {
    if (commentRef === null || commentRef.current === null) {
      return;
    }
    commentRef.current.style.height = '38px';
    commentRef.current.style.height = commentRef.current.scrollHeight + 'px';
  }, []);

  return (
    <section>
      <form className='comment-form' onSubmit={handleSubmit(addComment)}>
        <div className="comment-wrap">
          <span>
            <label htmlFor="name">이름: </label>
            <input type="text" {...register('name', { required: true, maxLength: 10 })} value={name} onChange={onChangeName} />
            {errors.name && errors.name.type === "maxLength" && <span>10자 이내로 작성해 주세요</span> }
          </span>
          <span>
            <label htmlFor="password">비밀번호: </label>
            <input type="password" name="password" value={password} onChange={onChangePassword} />
          </span>
        </div>
        <div className="textarea-wrap">
          <textarea 
            className="comment-textarea" 
            name="comment" 
            cols={30} 
            rows={5} 
            value={comment} 
            onChange={onChangeComment} 
            onInput={handleResizeHeight}
            placeholder="축하 메시지를 작성해 주세요" 
            ref={commentRef}
          />
          <button type="submit" className="submit-button">
            축하하기
          </button>
        </div>
      </form>
      <div className="comment-list-wrap">
        {commentList.map(comment => (
          <div key={comment.key} className='comment-list-inner'>
            <div className='comment-box-name'>
              <span>
                <b>{comment.name}</b>
                <p>{parseCreatedTime(comment.createdTime)}</p>
              </span>
              <button className="delete-button" id={comment.key} onClick={openDeleteModal}>x</button>
            </div>
            <div>
              <span>{comment.comment}</span>
            </div>
          </div>
        ))}
      </div>
      {isDelete &&
        <div className="modal">
          <div className="modal-body">
            <input type="password" name="password" value={deletePassword} onChange={onChangeDeletePassword} />
            <button onClick={onDeleteComment}>삭제</button>
            <button onClick={closeDeleteModal}>취소</button>
          </div>
        </div>
      }
    </section>
  )
}