import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase.js'

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
    M.Modal.getInstance(modal).close()
    signupForm.reset()
  })
})
