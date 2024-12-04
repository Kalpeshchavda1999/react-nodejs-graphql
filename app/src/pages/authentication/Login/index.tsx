import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from 'yup';
import { useAppDispatch } from "../../../store";
import { createUser } from "../../../store/redux/userSlice/userExtraReducers";

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema : Yup.ObjectSchema<LoginFormValues> = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login: FC = () => {
  
  const dispatch = useAppDispatch();


  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema, 
    onSubmit: (values) => {
      dispatch(createUser({
        email: values.email,
        password: values.password,
      }));  
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box>
      <Container component="main" >
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
            <Box sx={{ mb: 2 , width: "400px" }}>
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
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
