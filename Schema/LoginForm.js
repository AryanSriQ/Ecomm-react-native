import { object, string, date } from "yup";

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str}`;
};

export const intialLoginValues = {
  email: "",
  password: ""
};

let loginSchema = object({
  email: string()
    .email("Invalid email")
    .required("Required"),
  password: string()
    .required("Please enter a password")
    // check minimum characters
    .min(6, "Password must have at least 6 characters")
    // different error messages for different requirements
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  createdOn: date().default(() => new Date()),
});

export default loginSchema;
