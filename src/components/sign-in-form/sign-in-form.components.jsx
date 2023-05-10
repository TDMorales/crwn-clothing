import { React, useState } from 'react'
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.components";
import {
    signInWithGooglePopup,
    createUserDocFromAuth,
    signInUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss'
const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { user } = await signInUserWithEmailAndPassword(email, password)
            resetFormFields();
        } catch (e) {
            switch (e.code) {
                case 'auth/user-not-found':
                    alert('Account does not exist.')
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password for email.')
                    break;
                default:
                    console.log(e)
            }
        }
    }
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button " onClick={signInWithGoogle} buttonType='google'>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm