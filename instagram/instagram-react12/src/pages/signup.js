import React, { useState } from "react";
import { useSignUpPageStyles } from "../styles";
import SEO from "../components/shared/Seo";
import { LoginWithGoogle } from "./login";
import {
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../auth";
import { useForm } from "react-hook-form";
import { HighlightOff, CheckCircleOutline } from "@material-ui/icons";
import isEmail from "validator/lib/isEmail";
import { useApolloClient } from "@apollo/react-hooks";
import { CHECK_IF_USERNAME_IS_TAKEN } from "../graphql/queries";

function SignUpPage() {
  const classes = useSignUpPageStyles();
  const { register, handleSubmit, formState, errors } = useForm({
    mode: "onChange",
  });
  const { signUpWithEmailAndPassword } = React.useContext(AuthContext);

  const history = useHistory();
  const [error, setError] = useState("");
  const client = useApolloClient();

  const onSubmit = async (data) => {
    try {
      setError("");
      await signUpWithEmailAndPassword(data);
      setTimeout(() => {
        history.push("/");
      }, 0);
    } catch (error) {
      console.error("Error signing you up", error);
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.message.includes("users_username_key")) {
      setError("Username already taken");
    } else if (error.code.includes("auth")) {
      setError(error.message);
    }
  };

  const errorIcon = (
    <InputAdornment>
      <HighlightOff style={{ color: "red", height: 30, width: 30 }} />
    </InputAdornment>
  );

  const validIcon = (
    <InputAdornment>
      <CheckCircleOutline style={{ color: "#ccc", height: 30, width: 30 }} />
    </InputAdornment>
  );

  const validateUsername = async (username) => {
    const variables = { username };
    const response = await client.query({
      query: CHECK_IF_USERNAME_IS_TAKEN,
      variables: variables,
    });
    const isUsernameValid = response.data.users.length === 0;
    return isUsernameValid;
  };

  return (
    <>
      <SEO title="Sign Up" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign Up to see photos and videos from your friends
            </Typography>
            <LoginWithGoogle color="primary" variant="contained" />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                inputRef={register({
                  required: true,
                  validate: (input) => isEmail(input),
                })}
                InputProps={{
                  endAdornment: errors.email
                    ? errorIcon
                    : formState.touched.email && validIcon,
                }}
                variant="filled"
                label="Email"
                name="email"
                type="email"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                fullWidth
                inputRef={register({
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
                InputProps={{
                  endAdornment: errors.name
                    ? errorIcon
                    : formState.touched.name && validIcon,
                }}
                variant="filled"
                name="name"
                label="Full Name"
                type="text"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                fullWidth
                inputRef={register({
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  validate: async (input) => await validateUsername(input),
                  pattern: /^[a-zA-Z0-9_.]*$/,
                })}
                InputProps={{
                  endAdornment: errors.username
                    ? errorIcon
                    : formState.touched.username && validIcon,
                }}
                variant="filled"
                label="Username"
                name="username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                inputRef={register({
                  required: true,
                  minLength: 6,
                })}
                InputProps={{
                  endAdornment: errors.password
                    ? errorIcon
                    : formState.touched.password && validIcon,
                }}
                variant="filled"
                label="Password"
                type="password"
                name="password"
                margin="dense"
                className={classes.textField}
                autoComplete="new-password"
              />
              <Button
                disabled={!formState.isValid || formState.isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
            <AuthError error={error} />
          </Card>
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2">
              Have an account?
            </Typography>
            <Link to="/accounts/login">
              <Button color="primary" className={classes.loginButton}>
                Log In
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
}

export function AuthError({ error }) {
  return (
    Boolean(error) && (
      <Typography
        align="center"
        gutterBottom
        variant="body2"
        style={{ color: "red" }}
      >
        {error}
      </Typography>
    )
  );
}

export default SignUpPage;
