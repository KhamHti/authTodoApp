import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const SignUp = ({ navigation }) => {
  const img = require("../../assets/white.jpg");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPsw, setConfirmPsw] = useState("");
  const [validateSms, setValidateSms] = useState("");

  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidateSms("Password do not match");
    } else {
      setValidateSms("");
    }
    setValue(value);
  };

  const signUpHandler = () => {
    if (password === confirmPsw) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser);
          navigation.navigate("ToDo", { user: userCredential.user });
        })
        .catch((error) => {
          setValidateSms(error.message);
        });
    }
  };

  return (
    <ImageBackground style={styles.container} source={img}>
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}
      >
        <Text style={styles.title}>SignUp</Text>
        <Text style={{ color: "red" }}>{validateSms}</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Email"
          placeholderTextColor="#40513B"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCorrect="false"
          autoCapitalize="false"
        />
        <TextInput
          style={styles.inputText}
          placeholder="Enter Password"
          placeholderTextColor="#40513B"
          secureTextEntry
          value={password}
          onChangeText={(value) =>
            validateAndSet(value, confirmPsw, setPassword)
          }
        />
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          placeholderTextColor="#40513B"
          secureTextEntry
          value={confirmPsw}
          onChangeText={(value) =>
            validateAndSet(value, password, setConfirmPsw)
          }
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={[
                styles.bottomText,
                { paddingLeft: 10, color: "#645CBB", fontWeight: "bold" },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Button title="SignUp" color="#40513B" onPress={signUpHandler} />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignUp;
