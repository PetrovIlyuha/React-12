import React, { useState, useContext } from "react";
import { useLoginPageStyles } from "../styles";
import GoogleSignInIcon from "../images/google-icon.png";
import FacebookIconWhite from "../images/facebook-icon-white.png";

import SEO from "../components/shared/Seo";
import {
  Card,
  CardHeader,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { AuthContext } from "../auth";
import { useApolloClient } from "@apollo/react-hooks";
import { GET_USER_EMAIL } from "../graphql/queries";
import { AuthError } from "./signup";

function LoginPage() {
  const classes = useLoginPageStyles();
  const { register, handleSubmit, watch, formState } = useForm({
    mode: "onBlur",
  });
  const { logInWithEmailAndPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setPasswordVisibility] = useState(false);
  const passwordEntered = Boolean(watch("password"));
  const history = useHistory();
  const client = useApolloClient();

  const onSubmit = async ({ input, password }) => {
    try {
      setError("");
      if (!isEmail(input)) {
        input = await getUserEmail(input);
      }
      await logInWithEmailAndPassword(input, password);
      setTimeout(() => {
        history.push("/");
      }, 0);
    } catch (error) {
      console.error("Error signing in", error);
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.code.includes("auth")) {
      setError(error.message);
    }
  };

  async function getUserEmail(input) {
    const variables = { input };
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables,
    });
    const userEmail = response.data.users[0]?.email || "no@email.com";
    return userEmail;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };
  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="input"
                inputRef={register({
                  required: true,
                  minLength: 5,
                })}
                fullWidth
                variant="filled"
                label="Username, email or phone"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                name="password"
                fullWidth
                inputRef={register({
                  required: true,
                  minLenght: 6,
                })}
                InputProps={{
                  endAdornment: passwordEntered && (
                    <InputAdornment>
                      <Button onClick={togglePasswordVisibility}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputAdornment>
                  ),
                }}
                variant="filled"
                label="Password"
                margin="dense"
                type={showPassword ? "text" : "password"}
                className={classes.textField}
                autoComplete="current-password"
              />
              <Button
                disabled={!formState.isValid || formState.isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Log In
              </Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <LoginWithGoogle color="secondary" iconColor="blue" />
            <AuthError error={error} />
            <Button fullWidth color="secondary">
              <Typography variant="caption">Forgot password?</Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align="right" variant="body2">
              Don't have an account?
            </Typography>
            <Link to="/accounts/emailsignup">
              <Button color="primary" className={classes.signUpButton}>
                Sign Up
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
}

export const LoginWithGoogle = ({ color, variant }) => {
  const classes = useLoginPageStyles();
  const { logInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const history = useHistory();
  const handleLoginWithGoogle = async () => {
    try {
      await logInWithGoogle();
      setTimeout(() => {
        history.push("/");
      }, 0);
    } catch (err) {
      console.error(`Error on sign in with Google : ${err}`);
      setError(error.message);
    }
  };
  return (
    <>
      <Button
        onClick={handleLoginWithGoogle}
        fullWidth
        color={color}
        variant={variant}
      >
        <img
          src={GoogleSignInIcon}
          alt="Facebook icon"
          className={classes.facebookIcon}
        />
        Log In With Google
      </Button>
      <AuthError error={error} />
    </>
  );
};
export default LoginPage;
