import { Box, Card, Link, TextField, Typography } from "@mui/material";
import { FormControl } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { doSignUp } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { emailRegex, userNamePattern } from "../../util/consts";

const InvaliduserNameMessage =
  "User Name Should Start with a letter of alphabet with numbers and at least be between 8 to 32 characters ";
const InvalidPasswordMessage =
  "Password Should at least be between 8 to 32 characters ";

function SignUpPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [userNameValid, setUserNameValid] = useState<string | null>(null);
  const [passwordValid, setPasswordValid] = useState<string | null>(null);
  const [firstNameValid, setFirstNameValid] = useState<string | null>(null);
  const [lastNameValid, setLastNameValid] = useState<string | null>(null);
  const [emailValid, setEmailValid] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleValidation = () => {
    setUserNameValid(
      typeof userName === "string" && userName.length === 0
        ? "This Field Is Required"
        : !userNamePattern.test(userName || "")
        ? InvaliduserNameMessage
        : null
    );
    setPasswordValid(
      typeof password === "string" && password.length === 0
        ? "This Field Is Required"
        : !userNamePattern.test(password || "")
        ? InvalidPasswordMessage
        : null
    );
    setFirstNameValid(
      typeof firstName === "string" && firstName.length === 0
        ? "This Field Is Required"
        : null
    );
    setLastNameValid(
      typeof lastName === "string" && lastName.length === 0
        ? "This Field Is Required"
        : null
    );
    setEmailValid(
      typeof email === "string" && email.length === 0
        ? "This Field Is Required"
        : !emailRegex.test(email || "")
        ? "Invalid Email Address"
        : null
    );
  };

  const handleSubmit = () => {
    handleValidation();
    if (
      !userName ||
      !password ||
      !firstName ||
      !lastName ||
      !email ||
      userNameValid ||
      passwordValid ||
      firstNameValid ||
      lastNameValid ||
      emailValid
    )
      return;

    setLoading(true);
    dispatch(
      doSignUp({
        username: userName,
        password: password,
        firstName,
        lastName,
        email,
      })
    )
      .unwrap()
      .then(() => navigate("/"))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          <FormControl>
            <Box
              sx={{
                width: "35vw",
                display: "flex",
                flexDirection: "column",
                gap: "1em",
                p: 4,
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                style={{ lineHeight: 1, margin: 0 }}
              >
                Sign Up
              </Typography>
              <TextField
                type="text"
                name="username"
                label="User Name"
                variant="standard"
                error={Boolean(userNameValid)}
                helperText={userNameValid}
                onChange={(e) => setUserName(e.target?.value?.trim())}
                onBlur={handleValidation}
                required
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="standard"
                error={Boolean(passwordValid)}
                helperText={passwordValid}
                onChange={(e) => setPassword(e.target?.value?.trim())}
                onBlur={handleValidation}
                required
              />
              <TextField
                type="text"
                name="firstName"
                label="First Name"
                variant="standard"
                error={Boolean(firstNameValid)}
                helperText={firstNameValid}
                onChange={(e) => setFirstName(e.target?.value?.trim())}
                onBlur={handleValidation}
                required
              />
              <TextField
                type="text"
                name="lastName"
                label="Last Name"
                variant="standard"
                error={Boolean(lastNameValid)}
                helperText={lastNameValid}
                onChange={(e) => setLastName(e.target?.value?.trim())}
                onBlur={handleValidation}
                required
              />
              <TextField
                type="email"
                name="email"
                label="Email"
                variant="standard"
                error={Boolean(emailValid)}
                helperText={emailValid}
                onChange={(e) => setEmail(e.target?.value?.trim())}
                onBlur={handleValidation}
                required
              />
              <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                variant="outlined"
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
              </LoadingButton>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/auth/login")}
              >
                Already have an account? go to Login
              </Link>
            </Box>
          </FormControl>
        </Card>
      </Box>
    </>
  );
}

export default SignUpPage;
