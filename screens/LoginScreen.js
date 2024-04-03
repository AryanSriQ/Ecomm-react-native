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
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Entypo } from "@expo/vector-icons";
import loginSchema from "../Schema/LoginForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logInUser } from "../Hooks/Auth";
import { intialLoginValues } from "../Schema/LoginForm";

export default function LoginScreen({ navigation }) {
  const [secure, setSecure] = useState(true);

  useEffect(() => {
    // Define an async function named loginStatus
    const loginStatus = async () => {
      try {
        // Use AsyncStorage to retrieve the value of "authToken" from storage
        const token = await AsyncStorage.getItem("authToken");
        // Check if a token exists
        if (token) {
          // If a token exists, navigate to the "main" screen
          navigation.replace("main");
        }
      } catch (error) {
        // If an error occurs, log it to the console
        console.log(error);
      }
    };
    loginStatus();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center", position: "relative" }}>
          <Text style={styles.loginText}>Login to your account</Text>
        </View>
        <Formik
          initialValues={intialLoginValues}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            // const res = await fetch("http://10.0.2.2:8000/api/auth/login", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify(values),
            // })
            await logInUser(values)
              .then(() => {
                navigation.replace("main");
              })
              .catch((err) => {
                console.log("Login Error : ", err);
              });
            // await AsyncStorage.setItem("authToken", res.data.token);
          }}
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
                  secureTextEntry={secure}
                  placeholder="Password"
                />
                <Entypo
                  name={`${secure ? "eye-with-line" : "eye"}`}
                  size={24}
                  color="black"
                  style={styles.icon}
                  onPress={() => setSecure(!secure)}
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
                    Login
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
          onPress={() => navigation.navigate("register")}
        >
          Don't have an account? Register
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
    top: 10,
    fontSize: 20,
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
