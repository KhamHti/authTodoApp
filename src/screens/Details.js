import { View, Text, Button } from "react-native";
import React from "react";
import { styles } from "../styles/styles";

const Details = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Button title="Back" onPress={() => navigation.navigate("ToDo")} />
    </View>
  );
};

export default Details;
