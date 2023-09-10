import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { onSnapshot } from 'firebase/firestore'
import { auth, guidesCollection } from './firebase.js'
import { setupGuides } from './index.js'

// get data
const unsub = onSnapshot(guidesCollection, (snapshot) => {
  setupGuides(snapshot.docs)
})

// listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('user logged in: ' + user.email)
  } else {
    console.log('user logged out.')
  }
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

  createUserWithEmailAndPassword(auth, email, password).then((cred) => {
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

  signInWithEmailAndPassword(auth, email, password).then((cred) => {
    const modal = document.querySelector('#modal-login')
    loginForm.reset()
    M.Modal.getInstance(modal).close()
  })
})
