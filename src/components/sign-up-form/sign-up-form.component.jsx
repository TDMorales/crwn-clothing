import { React, useState } from 'react'
import './sign-up-form.styles.scss'
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.components';

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

  // console.log(formFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert('Passwords do not match')
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      await createUserDocFromAuth(user, { displayName })
      resetFormFields();
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        alert('Email already in use');
      } else {
        console.log('user creation encountered an error', e)
      }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />

        <FormInput label="Email" type="email" required onChange={handleChange} name='email' value={email} />
        <FormInput label="Password" type="password" required onChange={handleChange} name='password' value={password} minLength={6} />
        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword} minLength={6} />
        <Button type="submit">Sign Up</Button >
      </form>
    </div>
  )
}

export default SignUpForm 