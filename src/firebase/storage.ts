// storage.js
import * as firebase from 'firebase/app';
import 'firebase/storage';

// 파일 전체 목록 부르기 + url 가져오기
// export async function getThumbnail() {
//     const { items } = await firebase.storage().ref(`/`).listAll();
//     const thumbnaills = [];
//     items.map((i) => {
//         const { fullPath } = i;
//         thumbnaills.push({
//             url: firebase.storage().ref(fullPath).getDownloadURL(),
//             fullPath,
//         });
//     })
//     return thumbnaills;
// }