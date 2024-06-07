import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { replaceName } from './replaceName';
import { fs, storage } from '@/firebase/firabaseConfig';
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { handleResize } from './resizeImage';
import path from 'path';

export class HandleFile {
  static HandleFiles = (files: any, id: string) => {
    const items: any[] = [];

    for (const i in files) {
      if (files[i].size && files[i].size > 0) {
        items.push(files[i]);
      }
    }

    const ids: string[] = [];

    items.forEach(async item => {
      const newFile = await handleResize(item);
      await this.UploadToStore(newFile, id);
    });
  };

  static UploadToStore = async (file: any, id: string) => {
    const filename = replaceName(file.name);
    const path = `/images/${filename}`;
    const storageRef = ref(storage, path);

    const res = await uploadBytes(storageRef, file);

    if (res) {
      if (res.metadata.size === file.size) {
        const url = await getDownloadURL(storageRef);
        await this.SaveToFirestore({ downloadUrl: url, path, id });
      } else {
        return 'uploading';
      }
    } else {
      return 'Error upload';
    }
  };

  static SaveToFirestore = async ({ path, downloadUrl, id }: { path: string, downloadUrl: string, id: string; }) => {
    try {
      const snap = await addDoc(collection(fs, 'files'), {
        path,
        downloadUrl
      });

      const fileId = snap.id;

      if (fileId) {
        await updateDoc(doc(fs, `offers/${id}`), {
          files: arrayUnion(fileId)
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  static removeFile = async (id: string) => {
    try {
      const snap = await getDoc(doc(fs, `files/${id}`));
      if (snap.exists()) {
        const { path, downloadUrl } = snap.data();

        if (path) {
          await deleteObject(ref(storage, `${path}`));

          await deleteDoc(doc(fs, `files/${id}`));

        }
      }
    } catch (error) {
      console.log(error);
    }
  };
}