import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useState, useEffect } from "react";

function useCollection(currentCollection, userParams) {
  const [data, setData] = useState();

  useEffect(() => {
    let q;
    if (userParams[2]) {
      q = query(collection(db, currentCollection), where(...userParams));
      onSnapshot(q, (querySnapshot) => {
        const eda = [];
        querySnapshot.forEach((doc) => {
            eda.push({id: doc.id , ...doc.data()});
        });
        setData(eda);
      });
    }
  }, [currentCollection, userParams[2]]);

  return { data };
}


export { useCollection };
