import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../store";
import { useNavigate } from "react-router-dom";
import { login } from "../../../store/redux/authSlice/asyncThunk";
import { ILoginFormValues } from "../../../store/redux/authSlice/interface";
import React from "react";

const validationSchema: Yup.ObjectSchema<ILoginFormValues> = Yup.object().shape(
  {
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  }
);

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik<ILoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await dispatch(
        login({
          email: values.email,
          password: values.password,
        })
      );
      navigate("/");
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
          <Typography variant="h3">Login</Typography>
          <form onSubmit={formik.handleSubmit}>
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
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
