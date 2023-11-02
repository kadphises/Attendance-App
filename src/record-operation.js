import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
const month = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
const date = new Date();

export const addCheckInTime = async () => {
  try {
    /**
     * Check if doc exists or not if not exists create one and entry otherwise update it
     */
    const docRef = doc(db, "usersList", auth.currentUser.email);
    const docSnap = await getDoc(docRef);
    const entryData = {
      month: month[date.getMonth()],
      date: date.getDate() + 3,
      checkInTime: Date.now(),
      checkOutTime: null,
    };

    if (docSnap.exists()) {
      /**Update the data or add entry */
      console.log("Document exists abd updating it");
      const currentQueue = docSnap.data()?.list;
      currentQueue.push(entryData);

      // If the queue exceeds 45 entries, remove the oldest entry
      if (currentQueue.length > 45) {
        currentQueue.shift(); // Remove the oldest entry
      }
      await updateDoc(docRef, {
        list: currentQueue,
      });

      console.log("Document data updated with new data");
    } else {
      // docSnap.data() will be undefined in this case
      /**
      first time entry so create one doc */
      console.log("No such document Creating One");
      const usersListRef = collection(db, "usersList");

      await setDoc(doc(usersListRef, auth.currentUser.email), {
        userEmail: auth.currentUser.email,
        list: [
          {
            month: month[date.getMonth()],
            date: date.getDate(),
            checkInTime: Date.now(),
            checkOutTime: Date.now(),
          },
        ],
      });
      console.log("document created and entry added");
    }
  } catch (e) {
    console.log(e);
  }
};
