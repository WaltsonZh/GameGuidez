// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBjHdjCHbnzrpWMN1qDBI8KAmV1Pu7sDd0',
  authDomain: 'game-guidez-416c3.firebaseapp.com',
  projectId: 'game-guidez-416c3',
  storageBucket: 'game-guidez-416c3.appspot.com',
  messagingSenderId: '646717595986',
  appId: '1:646717595986:web:a64181298cccb68ea71a8b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const guidesCollection = collection(db, 'guides')
