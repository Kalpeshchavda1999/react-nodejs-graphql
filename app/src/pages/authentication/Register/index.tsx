import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from "yup";
import { useAppDispatch } from "../../../store";
import { useNavigate } from "react-router-dom";
import { IRegisterFormValues } from "../../../store/redux/authSlice/interface";
import { register } from "../../../store/redux/authSlice/asyncThunk";

const validationSchema: Yup.ObjectSchema<IRegisterFormValues> =
  Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string().required("Required"),
  });

const Register: FC = () => {
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
      await dispatch(
        register({
          username: values.username,
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
                error={formik.touched.username && Boolean(formik.errors.username)}
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
                  formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                }
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
