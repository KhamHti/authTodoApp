import {
  View,
  Text,
  Button,
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { signOut, sendEmailVerification } from "firebase/auth";
import AddToDoModal from "../components/AddToDoModal";

const Todo = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toDos, setToDos] = useState([]);

  const logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop("Login");
    });
  };

  const loadTodo = async () => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    const toDos = [];
    querySnapshot.forEach((doc) => {
      toDos.push(doc.data());
      // console.log(doc.id, " => ", doc.data());
    });
    console.log(toDos);
    setToDos(toDos);
    setIsLoading(false);
  };

  const showTodoLists = () => {};

  const showContent = () => {
    return (
      <View style={styles.todoContainer}>
        {isLoading ? <ActivityIndicator size={"large"} /> : showTodoLists()}
        <Button
          title="Add ToDo"
          color="#258ea6"
          onPress={() => setModalVisible(true)}
        />
      </View>
    );
  };

  const showSendEmailVerificatiion = () => {
    return (
      <View style={{ margin: 15 }}>
        <Text>Please verify your email</Text>
        <Button
          title="sendVerification"
          onPress={() => sendEmailVerification(auth.currentUser)}
        />
      </View>
    );
  };

  const addTODO = async (todo) => {
    const docRef = await addDoc(collection(db, "todos"), {
      text: todo,
      completed: false,
    });

    console.log(docRef);
  };

  return (
    <SafeAreaView style={styles.todoContainer}>
      <View style={{ left: 100, paddingBottom: 5 }}>
        <Button
          title="Manage Account"
          color="#258ea6"
          onPress={() => navigation.navigate("Details")}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddToDoModal
          onClose={() => setModalVisible(false)}
          addToDo={addTODO}
        />
      </Modal>

      <Text style={styles.header}>Todo</Text>
      {auth.currentUser.emailVerified
        ? showContent()
        : showSendEmailVerificatiion()}
      <Button title="LogOut" onPress={logout} color="#258ea6" />
    </SafeAreaView>
  );
};

export default Todo;
