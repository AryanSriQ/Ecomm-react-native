import * as Yup from "yup";

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str}`;
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .required("Required"),
  password: Yup.string()
    .required("Please enter a password")
    // check minimum characters
    .min(6, "Password must have at least 6 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: Yup.string()
    .label("confirm password")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default registerSchema;
