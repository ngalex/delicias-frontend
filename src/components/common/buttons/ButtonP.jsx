import { Text, TouchableOpacity, StyleSheet } from "react-native";
export function ButtonP(props) {
  const { onPress, title, backgroundColor, width } = props;
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor,
        width
      }}
      onPress={onPress}
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
