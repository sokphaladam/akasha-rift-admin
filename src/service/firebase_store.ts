import { getDoc, doc, Firestore, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export class firebase_store {
  initFirestore: Firestore;

  constructor(initFirestore?: Firestore){
    this.initFirestore = initFirestore ? initFirestore : firestore;
  }

  static async getData(path: string, key?: string): Promise<{
    status: boolean;
    data: any[] | any | string
  }>{
    let docRef = null;
    
    if(key) {
      docRef = doc(firestore, path, key);
    }
    else{
      docRef = doc(firestore, path);
    }

    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()) {
      return {
        status: true,
        data: docSnap.data()
      };
    }
    else {
      return {
        status: false,
        data: null
      };
    }
  }

  static async updateData(path: string, key: string, data: any) {
    const docRef = doc(firestore, path, key);
    return setDoc(docRef, data)
    .then((docRef) => {
      return {
        status: true,
        message: "Entire Document has been updated successfully"
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error
      }
    });
  }
}