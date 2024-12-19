import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createClient } from "../../store/redux/clientSlice/asyncThunk";
import { useNavigate } from "react-router-dom";
import routes from "../../constants/routes";
import { useAppDispatch, useAppSelector } from "../../store";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name should be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const CreateClient = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { creating, error } = useAppSelector((state) => state.client);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("🚀 ~ onSubmit: ~ values:", values)
      const result = await dispatch(createClient(values));
      if (result.meta.requestStatus === "fulfilled") {
        navigate(routes.CLIENTS);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Create New Client
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={creating}
          >
            {creating ? "Creating..." : "Create Client"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateClient;
