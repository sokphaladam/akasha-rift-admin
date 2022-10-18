import { Button, TextInputField } from "evergreen-ui";
import React, { useContext } from "react";
import { auth } from "../service/firebase";
import "../styles/login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../context/UserContext";

export function LoginPage() {
  const { setUser } = useContext(UserContext);
  const onSubmit = (e: any) => {
    e.preventDefault();
    const input = {
      email: e.target.username.value,
      password: e.target.password.value,
    };

    signInWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error.code + ":" + error.message);
      });
  };

  return (
    <div className="login__page">
      <div className="login__page__card">
        <div className="login__page__card__head">Akasha Rift</div>
        <br />
        <h3>Sign In</h3>
        <form onSubmit={onSubmit}>
          <TextInputField name="username" label="Username or Email" required />
          <TextInputField
            name="password"
            type="password"
            label="Password"
            required
          />
          <hr style={{ marginBottom: 20 }} />
          <Button appearance="primary" style={{ width: "100%" }}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
