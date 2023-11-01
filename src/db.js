import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
// import { auth } from "./firebase";
export const sendAllowedList = async (newList) => {
  return await setDoc(doc(db, "attendance", "allowedOnboardedUsers"), {
    allowedUsers: newList,
  });
};

export const getAllowedEmailList = async () => {
  try {
    const docRef = doc(db, "attendance", "allowedOnboardedUsers");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().allowedUsers;
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};
