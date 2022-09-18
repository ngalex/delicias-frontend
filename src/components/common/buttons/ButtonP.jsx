import { Text, TouchableOpacity, StyleSheet } from "react-native";
export function ButtonP(props) {
  const { onPress, title, backgroundColor, width, disabled } = props;

  const disabledStyle = {
    opacity: disabled ? 0.4 : 1
  }
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor,
        width, ...disabledStyle
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderRadius: 20,
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center"
  },
});
