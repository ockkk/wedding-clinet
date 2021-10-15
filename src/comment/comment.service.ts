import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { CommentList } from './comment.model';

export const getComment = async (setState: any) => {
  const querySnapshot = await getDocs(collection(db, "comment"));
  const commentList: CommentList[] = [];
  querySnapshot.forEach((doc) => {
    commentList.push({
      key: doc.id,
      name: doc.data().name,
      comment: doc.data().comment,
      password: doc.data().password,
    })
  });
  
  setState(commentList);
}

export const addComment = async (
  name: string,
  comment: string,
  password: number,
) => {
  await addDoc(collection(db, "comment"), {
    name,
    comment,
    password,
  });
}

// export const deleteComment = async (key: string, password: number) => {
//   await deleteDoc(collection(db, 'comment'))
// }