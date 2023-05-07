import {React, useState} from 'react'
import './sign-up-form.styles.scss'
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  // const [visible, setVisible] = useState(false) 
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields)

  const resetFormFields = () =>{
    setFormFields(defaultFormFields)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(confirmPassword !== password){
      alert('Passwords do not match')
      return;
    }
    try{
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      await createUserDocFromAuth(user, { displayName })
      resetFormFields(); 
    }catch(e){
      if(e.code === 'auth/email-already-in-use'){
        alert('Email already in use');
      }else{
        console.log('user creation encountered an error', e)
      }
    }
  }

  return (
    <div>
      <h1>Sign up with email and password</h1>
      <form action="post" className='sign-up-form' onSubmit={handleSubmit}>
        <label htmlFor="">Display Name</label>
        <input type="text" required onChange={handleChange} name='displayName' value={displayName}/>
        <label htmlFor="">Email</label>
        <input type="email" required onChange={handleChange} name='email' value={email}/>
        <label htmlFor="">Password</label>
        <input type="password" required onChange={handleChange} name='password' value={password} minLength={6}/>
        <label htmlFor="">Confirm Password</label>  
        <input type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword} minLength={6}/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm 