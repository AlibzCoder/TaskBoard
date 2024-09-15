import { Box, Card, Link, TextField, Typography } from "@mui/material";
import { FormControl } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { doLogin } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { userNamePattern } from "../../util/consts";

const InvaliduserNameMessage =
  "User Name Should Start with a letter of alphabet with numbers and at least be between 8 to 32 characters ";
const InvalidPasswordMessage =
  "Password Should at least be between 8 to 32 characters ";

function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [userNameValid, setUserNameValid] = useState<string | null>(null);
  const [passwordValid, setPasswordValid] = useState<string | null>(null);
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
  };

  const handleSubmit = () => {
    handleValidation();
    if (!userName || !password || userNameValid || passwordValid) return;
    setLoading(true);
    dispatch(
      doLogin({
        username: userName,
        password: password,
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
                gap: "2em",
                p: 4,
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                style={{ lineHeight: 1, margin: 0 }}
              >
                Login
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
              <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                variant="outlined"
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </LoadingButton>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/auth/sign-up")}
              >
                Didn't Create an account yet? go to Sign Up
              </Link>
            </Box>
          </FormControl>
        </Card>
      </Box>
    </>
  );
}

export default LoginPage;
