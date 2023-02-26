import { View, Text, Modal, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { styles } from "../styles/styles";

const AddToDoModal = (props) => {
  const [todo, setTodo] = useState("");
  return (
    <View style={styles.container}>
      <Text style={[styles.header, { marginBottom: 10 }]}>Add ToDo</Text>
      <TextInput
        style={[styles.inputContainer, styles.darkTextInput, styles.inputText]}
        placeholder="ToDo"
        value={todo}
        onChangeText={setTodo}
      />
      <View style={styles.bottomContainer}>
        <Button title="Cancel" onPress={props.onClose} />
        <Button
          title="OK"
          onPress={() => {
            props.addToDo(todo);
            setTodo("");
            props.onClose();
          }}
        />
      </View>
    </View>
  );
};

export default AddToDoModal;
