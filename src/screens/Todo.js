import {
  View,
  Text,
  Button,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";
import { auth, db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signOut, sendEmailVerification } from "firebase/auth";
import AddToDoModal from "../components/AddToDoModal";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import InlineTextButton from "../components/InlineTextButton";

const Todo = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toDos, setToDos] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop("Login");
    });
  };

  const loadTodoList = async () => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      const toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });
    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
    // console.log(toDos);
  };

  if (isLoading) {
    loadTodoList();
  }

  const checkTodoItem = (item, isChecked) => {};

  const deleteTodo = async (todoId) => {
    await deleteDoc(doc(db, "todos", todoId));
    const updateTodos = [...toDos].filter((item) => item.id !== todoId);
    setToDos(updateTodos);
  };

  const renderTodoItem = ({ item }) => {
    return (
      <View style={styles.rowContainer}>
        <BouncyCheckbox
          isChecked={item.complated}
          size={25}
          fillColor="#258ea6"
          unfillColor="#ffffff"
          text={item.text}
          iconStyle={{ borderColor: "#258ea6" }}
          onPress={(isChecked) => {
            checkTodoItem(item, isChecked);
          }}
        />
        {/* <View style={styles.rightAligned}> */}
        <InlineTextButton
          text="Delete"
          color="#258ea6"
          onPress={() => deleteTodo(item.id)}
        />
        {/* </View> */}
      </View>
    );
  };

  const showTodoLists = () => {
    return (
      <FlatList
        style={styles.list}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadTodoList();
          setIsRefreshing(true);
        }}
        data={toDos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

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
    const toDoSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "todos"), toDoSave);

    toDoSave.id = docRef.id;
    const updatedTodos = [...toDos];
    updatedTodos.push(toDoSave);
    setToDos(updatedTodos);
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
