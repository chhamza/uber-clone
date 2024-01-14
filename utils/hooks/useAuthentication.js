import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const authentication = getAuth();
const firestoreDB = getFirestore();

export function useAuthentication() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);


    async function getUserData(userId) {
        try {
        const userRef = doc(firestoreDB, 'users', userId);
        const userSnapshot = await getDoc(userRef);
    
        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUserData(userData);
            // Now you can use the user data as needed in your component or application logic
        } else {
            console.log('User data not found');
            setUserData(undefined);
        }
        } catch (error) {
            console.error('Error getting user data:', error);
        }
    }

    useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(authentication, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        getUserData(user.uid);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user, userData
  };
}