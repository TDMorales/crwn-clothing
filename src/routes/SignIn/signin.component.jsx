import { React, useEffect } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.components";

import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  };


  return (
    <div>
      <h1>Sign In Page</h1>
      <Button onClick={logGoogleUser} buttonType='google'>Sign In With Google</Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
