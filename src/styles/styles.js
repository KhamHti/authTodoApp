import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  todoContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    // backgroundColor: "yellow",
  },
  header: {
    fontSize: 26,
    alignSelf: "center",
  },
  inputContainer: {
    backgroundColor: "#EDF1D6",
    justifyContent: "center",
    opacity: 0.7,
    alignSelf: "stretch",
    marginHorizontal: 20,
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    // borderRadius: 17,
  },
  inputText: {
    color: "#40513B",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#666",
  },
  darkTextInput: {
    color: "#000000",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#40513B",
    textAlign: "center",
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // alignSelf: "stretch",
    marginVertical: 4,
    marginHorizontal: 8,
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 14,
    paddingVertical: 8,
  },
  bottomText: {
    color: "#40513B",
    fontSize: 16,
  },
  button: {
    paddingBottom: 20,
  },
  inlineTextButton: {
    color: "#87F1FF",
  },
  pressedInlineTextButton: {
    color: "#87F1FF",
    opacity: 0.6,
  },
  rightAligned: {
    justifyContent: "flex-end",
    // right: 10,
  },
  list: {
    alignSelf: "stretch",
    // backgroundColor: "red",
  },
});

export { styles };
