import { database } from "../firebase";
import { useAuth } from "../auth/UserAuthContext";
import { useRouter } from "next/router";

import {
  doc,
  updateDoc,
  deleteField,
  setDoc,
  collection,
  getDoc,
  set,
  getDocFromServer,
} from "firebase/firestore";


  
export async function setPosition(auth, pos, coin) {
    /* pos is the size of the */
    let userId = auth.user.uid;
    let colRef = collection(database, userId);
    let docRef = doc(colRef, "position");
    let docSnap = await getDocFromServer(docRef);
    let dict = docSnap.data()
    if (dict == null) {
        let newDict = {};
        newDict[coin] = pos
        setDoc(docRef, newDict, { merge: true });
        return newDict; 
    }
    if (dict[coin] == null) {
        dict[coin] = pos
        setDoc(docRef, dict, { merge: true });
        return dict;
    }
    
    dict[coin] = pos;
    setDoc(docRef, dict, { merge: true });
    return dict;
}

