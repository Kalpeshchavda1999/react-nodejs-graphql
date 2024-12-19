import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../store";
import { useNavigate } from "react-router-dom";
import { IRegisterFormValues } from "../../../store/redux/authSlice/interface";
import { register } from "../../../store/redux/authSlice/asyncThunk";
import React from "react";
import routes from "../../../constants/routes";

const validationSchema: Yup.ObjectSchema<IRegisterFormValues> =
  Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"), // Add minimum length requirement for username

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters") // Add minimum length for password
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Optional: ensure password has at least one uppercase letter
      .matches(/[a-z]/, "Password must contain at least one lowercase letter") // Optional: ensure password has at least one lowercase letter
      .matches(/[0-9]/, "Password must contain at least one number"), // Optional: ensure password has at least one number

    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"), // Ensure confirmPassword matches password
  });

const Register: React.FC  = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik<IRegisterFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(
        register({
          username: values.username,
          email: values.email,
          password: values.password,
        })
      );      
      navigate(routes.CLIENTS);
    },
  });

  return (
    <Box>
      <Container component="main">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h3">Register</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mb: 2, width: "400px" }}>
              <TextField
                label="User Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                required
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Box>

            <Box sx={{ mb: 2, width: "400px" }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>

            <Box sx={{ mb: 2, width: "400px" }}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>

            <Box sx={{ mb: 2, width: "400px" }}>
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                required
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button>

            <Button
              type="button"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={() => navigate(routes.LOGIN)}
            >
              Already have an account? Login
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
