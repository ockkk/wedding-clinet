import { list } from 'firebase/storage';
import { storageRef } from '../firebase/firebase';

export const getImageUrl = async () => {
  const urlPath = process.env.REACT_APP_STORAGE_URL;
  
  try {
    const itemList = await (await list(storageRef)).items;
    const urlList = itemList.map(item => {
      console.log(item)
      return `https://storage.googleapis.com/${item.bucket}/${item.fullPath}`
    })

    return urlList;
  }

  catch (e) {
    console.log("Error: ", e)
    return [];
  }
}