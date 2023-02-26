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
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPsw = ({ navigation }) => {
  const img = require("../../assets/white.jpg");

  const [email, setEmail] = useState("");
  const [errorSms, setErrorSms] = useState("");

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.popToTop("Login");
      })
      .catch((error) => {
        setErrorSms(error.message);
      });
  };
  return (
    <ImageBackground style={styles.container} source={img}>
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={60}
      >
        <Text style={styles.title}>Reset Password</Text>
        <Text style={{ color: "red" }}>{errorSms}</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Email"
          placeholderTextColor="#609966"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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

        <View style={styles.button}>
          <Button
            title="Reset Password"
            color="#609966"
            onPress={resetPassword}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ResetPsw;
