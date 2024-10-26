import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Department from "../components/Department";
import axios from "axios";

const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .min(4, "First Name must be at least 4 characters")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabets are allowed")
    .min(4, "Last Name must be at least 4 characters")
    .required("Last Name is required"),
  username: Yup.string()
    .matches(/^[A-Za-z0-9]+$/, "Alphabets and digits only")
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  rollNumber: Yup.string()
    .matches(/^\d{4}[15]A[A-Za-z0-9]{4}$/, "Invalid roll number format")
    .length(10, "Roll number must be exactly 10 characters")
    .required("Roll number is required"),
  password: Yup.string()
    .min(6, "Password must be between 6 and 12 characters")
    .max(12, "Password must be between 6 and 12 characters")
    .required("Password is required"),
  department: Yup.string().required("Department is required"),
});

export default function SignUp() {
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange", // Enable onChange mode to update validity on field change
  });

  const rollNumber = watch("rollNumber");

  React.useEffect(() => {
    if (rollNumber && /^\d{4}[15]A[A-Za-z0-9]{4}$/.test(rollNumber)) {
      setValue("email", `${rollNumber}@vnrvjiet.in`);
    }
  }, [rollNumber, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/register",
        data
      );
      console.log("Registration successful:", response.data);
      setRedirectToSignIn(true); // Update state to trigger redirection
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error, show error message, etc.
    }
  };

  if (redirectToSignIn) {
    return <Navigate to="/home" />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="firstName"
                      label="First Name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="rollNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="rollNumber"
                      label="Roll Number"
                      error={!!errors.rollNumber}
                      helperText={errors.rollNumber?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Department
                  value={watch("department")}
                  onChange={(e) => setValue("department", e.target.value)}
                  error={!!errors.department}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="email"
                      label="Email Address"
                      InputProps={{
                        readOnly: true,
                      }}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Link to="/home">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid} // Disable the button if the form is not valid
              >
                Sign Up
              </Button>
            </Link>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
