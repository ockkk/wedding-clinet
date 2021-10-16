import { useState, useCallback, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useForm } from "react-hook-form";

interface CommentList {
  key: string;
  name: string;
  password: string;
  comment: string;
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
    await addDoc(collection(db, "comment"), {
      name,
      comment,
      password,
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
      console.log(`${doc.id} => ${doc.data().comment}`);
      commentList.push({
        key: doc.id,
        name: doc.data().name,
        comment: doc.data().comment,
        password: doc.data().password,
      })
    });
  
    setCommentList(commentList.reverse());
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

  return (
    <section>
      <form onSubmit={handleSubmit(addComment)}>
        <span>
          <label htmlFor="name">이름: </label>
          <input type="text" {...register('name', { required: true, maxLength: 10 })} value={name} onChange={onChangeName} />
          {errors.name && errors.name.type === "maxLength" && <span>10자 이내로 작성해 주세요</span> }
        </span>
        <span>
          <label htmlFor="password">비밀번호: </label>
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
            <button id={comment.key} onClick={openDeleteModal}>삭제하기</button>
          </div>
        ))}
      </div>
      {isDelete &&
        <div>
          <input type="password" name="password" value={deletePassword} onChange={onChangeDeletePassword} />
          <button onClick={onDeleteComment}>삭제</button>
          <button onClick={closeDeleteModal}>취소</button>
        </div>
      }
    </section>
  )
}