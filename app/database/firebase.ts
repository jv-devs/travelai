// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD1ZoVA7ipg5J-Qnj5iGVRDncNDKV5KUOs',
  authDomain: 'travelai-d7aa5.firebaseapp.com',
  projectId: 'travelai-d7aa5',
  storageBucket: 'travelai-d7aa5.appspot.com',
  messagingSenderId: '855534127324',
  appId: '1:855534127324:web:14d59e627bd698120a0c19',
  measurementId: 'G-QSF6JNZQQ1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const signIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      // The signed-in user info.
      const user = result.user
      // ...
      console.log(token, user)
    })
    .catch((error) => {
      // Handle Errors here.
      console.log('error handler', error)
    })
}
export default app
export { auth, signIn }
