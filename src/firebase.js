import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPq58SF6HYE_ZkfxL6BZcvm-cUWif0-EE",
  authDomain: "netflix-clone-44f7d.firebaseapp.com",
  projectId: "netflix-clone-44f7d",
  storageBucket: "netflix-clone-44f7d.firebasestorage.app",
  messagingSenderId: "205525940545",
  appId: "1:205525940545:web:95a75184b37e1562b709c0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password );
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local", 
            email,
        })
    }catch(error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password)=>{
    try{
        signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        alert(error);
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
