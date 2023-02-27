import { View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { styles } from "../styles/styles";
// import { async } from "@firebase/util";

const Details = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop("Login");
    });
  };

  const upDateUserPassword = () => {
    signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updatePassword(user, newPassword)
          .then(() => {
            setNewPassword("");
            setErrorMessage("");
            setCurrentPassword("");
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const deleteUserAccount = () => {
    if (currentPassword === "") {
      setErrorMessage("Must enter current password to delete account");
    } else {
      signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
        .then((userCredential) => {
          const user = userCredential.user;

          //get all todos for user and delete
          const q = query(
            collection(db, "todos"),
            where("userId", "==", user.uid)
          );
          const batch = writeBatch(db);

          // const querySnapshot = await getDocs(q);

          getDocs(q).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              batch.delete(doc.ref);
            });
            batch.commit();

            deleteUser(user)
              .then(() => navigation.popToTop())
              .catch((error) => {
                setErrorMessage(error.message);
              });
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>{errorMessage}</Text>
      <TextInput
        style={[styles.inputContainer, styles.darkTextInput, styles.inputText]}
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        autoFocus={true}
        secureTextEntry
      />
      <TextInput
        style={[styles.inputContainer, styles.darkTextInput, styles.inputText]}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button
        title="Update Password"
        onPress={upDateUserPassword}
        color="#258ea6"
      />
      <Button title="Delete User" onPress={deleteUserAccount} color="#258ea6" />
      <Button title="LogOut" onPress={logout} color="#258ea6" />
      <Button
        title="Back to Todos"
        color="#258ea6"
        onPress={() => navigation.navigate("ToDo")}
      />
    </View>
  );
};

export default Details;
