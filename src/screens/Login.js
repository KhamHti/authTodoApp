import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Login = ({ navigation }) => {
  const img = require("../../assets/white.jpg");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorSms, setErrorSms] = useState("");

  if (auth.currentUser) {
    navigation.navigate("ToDo");
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("ToDo");
      }
    });
  }

  const login = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          navigation.navigate("ToDo", { user: userCredential.user });
          setErrorSms("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorSms(error.message);
        });
    } else {
      setErrorSms("Please enter an email and password");
    }
  };

  return (
    <ImageBackground style={styles.container} source={img}>
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}
      >
        <Text style={styles.title}>Login</Text>
        <Text style={{ color: "red" }}>{errorSms}</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Email"
          placeholderTextColor="#40513B"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.inputText}
          placeholder="Enter Password"
          placeholderTextColor="#40513B"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push("SignUp")}>
            <Text
              style={[
                styles.bottomText,
                { paddingLeft: 10, color: "#645CBB", fontWeight: "bold" },
              ]}
            >
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Forget password?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("ResetPsw")}>
            <Text
              style={[
                styles.bottomText,
                { paddingLeft: 10, color: "#645CBB", fontWeight: "bold" },
              ]}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Button title="Login" color="#40513B" onPress={login} />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Login;
