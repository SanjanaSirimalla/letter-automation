import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link from react-router-dom
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import sidepic from "../images/sidepic.jpeg";
import axios from "axios";

const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[A-Za-z0-9]+$/, "alphabets and digits only")
    .min(4, "username must be at least 4 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be between 6 and 12 characters")
    .max(12, "Password must be between 6 and 12 characters")
    .required("Password is required"),
});

export default function SignIn() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange", // Enable onChange mode to update validity on field change
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/login",
        data
      );
      console.log("Login successful:", response.data);
      setRedirectToHome(true); // Update state to trigger redirection
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error, show error message, etc.
    }
  };

  if (redirectToHome) {
    return <Navigate to="/home" />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${sidepic})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ m: 1 }}>
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="username"
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Link to="/home" variant="body2">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isValid}
                >
                  Sign In
                </Button>
              </Link>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  {/* Use Link from react-router-dom and provide the "to" prop */}
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
