import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { useState } from "react";
import { Formik } from "formik";
import { Entypo } from "@expo/vector-icons";
import registerSchema from "../Schema/RegisterForm";
import { signUpUser } from "../Hooks/Auth";

export default function RegisterScreen({ navigation }) {
  const [passSecure, setPassSecure] = useState(true);
  const [confirmPassSecure, setConfirmPassSecure] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center", position: "relative" }}>
          <Text style={styles.loginText}>Create a New Account</Text>
        </View>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={async (values) =>
            await signUpUser(values)
              .then(() => {
                navigation.replace("login");
              })
              .catch((err) => {
                console.log("Register Error : ", err);
              })
          }
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              {errors.name && touched.name && (
                <Text style={styles.errorMessage}>{errors.name}</Text>
              )}
              <TextInput
                style={styles.input}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholder="Name"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}
              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Email"
              />
              {errors.password && touched.password && (
                <Text style={styles.errorMessage}>{errors.password}</Text>
              )}
              <View style={{ position: "relative" }}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={passSecure}
                  placeholder="Password"
                />
                <Entypo
                  name={`${passSecure ? "eye-with-line" : "eye"}`}
                  size={24}
                  color="black"
                  style={styles.icon}
                  onPress={() => setPassSecure(!passSecure)}
                />
              </View>
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.errorMessage}>
                  {errors.confirmPassword}
                </Text>
              )}
              <View style={{ position: "relative" }}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={confirmPassSecure}
                  placeholder="ConfirmPassword"
                />
                <Entypo
                  name={`${confirmPassSecure ? "eye-with-line" : "eye"}`}
                  size={24}
                  color="black"
                  style={styles.icon}
                  onPress={() => setConfirmPassSecure(!confirmPassSecure)}
                />
              </View>
              <View style={styles.forgotPassword}>
                <Text style={{ color: "#478bef" }}>Forgot Password ?</Text>
              </View>
              <Pressable
                onPress={handleSubmit}
                style={styles.button}
                children={({ pressed }) => (
                  <Text
                    style={[
                      styles.buttonText,
                      { color: pressed ? "#eee" : "white" },
                    ]}
                  >
                    Register
                  </Text>
                )}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
      <View>
        <Text
          style={styles.registerText}
          onPress={() => navigation.navigate("login")}
        >
          Already have an account? Login
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 120,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3c3c3c",
    paddingBottom: 20,
  },
  icon: {
    position: "absolute",
    right: 10,
    fontSize: 20,
    top: 10,
    opacity: 0.5,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "gray",
    width: 300,
    marginBottom: 20,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    textAlign: "left",
    marginBottom: 2,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#f28e02",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    fontSize: 14,
    marginTop: 10,
    color: "gray",
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginBottom: 10,
    marginTop: -10,
  },
});
