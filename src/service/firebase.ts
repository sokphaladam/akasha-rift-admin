import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage,ref,
  uploadBytesResumable} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBMVZkBPybBM96fqeb5rlCOQceN1tBreuQ",
  authDomain: "akasharift-860aa.firebaseapp.com",
  projectId: "akasharift-860aa",
  storageBucket: "akasharift-860aa.appspot.com",
  messagingSenderId: "691171534430",
  appId: "1:691171534430:web:2e304ca451b91374dc36cf",
  measurementId: "G-Q5GF81C8J1"
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export function UploadFileToFirebase(file: File) {
  const upload = uploadBytesResumable(
    ref(storage, "akasha_rift/" + file.name),
    file
  );

  return upload;
}