import { Text, Pressable } from "react-native";
import { styles } from "../styles/styles";

export default function InlineTextButton(props) {
  let style = {};
  if (props.color) {
    style.color = props.color;
  }
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text
          style={[
            pressed ? styles.pressedInlineTextButton : styles.inlineTextButton,
            style,
          ]}
        >
          {props.text}
        </Text>
      )}
    </Pressable>
  );
}
