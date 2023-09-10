import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, setDoc, doc, onSnapshot } from 'firebase/firestore'
import { auth, guidesCollection, db } from './firebase.js'
import { setupGuides, setupUI } from './index.js'

// listen for auth state changes
onAuthStateChanged(auth, (user) => {
  setupUI(user)
  if (user) {
    const unsub = onSnapshot(
      guidesCollection,
      (snapshot) => {
        setupGuides(snapshot.docs)
      },
      (err) => console.log(err.message)
    )
  } else {
    setupGuides([])
  }
})

// create new guide
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(guidesCollection, {
    title: createForm['title'].value,
    content: createForm['content'].value,
  })
    .then(() => {
      const modal = document.querySelector('#modal-create')
      createForm.reset()
      M.Modal.getInstance(modal).close()
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// sign up
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = signupForm['signup-email'].value
  const password = signupForm['signup-password'].value

  /**
   * Users:
   * fake@fake.com, fakepassword
   * admin@admin.com, admin123
   * waltson2003@gmail.com, waltsonZh
   */

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      return setDoc(doc(db, 'users', cred.user.uid), {
        bio: signupForm['signup-bio'].value
      })
    })
    .then(() => {
      const modal = document.querySelector('#modal-signup')
      signupForm.reset()
      M.Modal.getInstance(modal).close()
    })
})

// log out
const logout = document.querySelector('#logout')
logout.addEventListener('click', (e) => {
  e.preventDefault()
  signOut(auth)
})

// log in
const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm['login-email'].value
  const password = loginForm['login-password'].value

  signInWithEmailAndPassword(auth, email, password).then(() => {
    const modal = document.querySelector('#modal-login')
    loginForm.reset()
    M.Modal.getInstance(modal).close()
  })
})
