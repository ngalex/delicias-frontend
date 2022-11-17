import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { baseColors } from "../../constants/baseColors";
import IconFont5 from 'react-native-vector-icons/FontAwesome';
// Falta:
// * configurar el modo orderShortMode que se utilizara para el orderList del Home
// * configurar boton opcional

//orderMode - orderShortMode - loanMode - productMode - shortMode
export default function Card(props) {
  // const { topCol1, topColumn2, middleColumn1, middleColumn2, botCol1, botCol2 } = data;
  const { data, displayMode} = props;

  const modalHandler = () => {
    props.modalHandler(data.key);
  };

  const selectionHandler = () => {
    props.selectionHandler(data.key);
  };

  const getTittleButton = () => {
    switch (displayMode) {
      case "productMode":
      case "orderMode":
        return "Cambiar Estado";
      case "loanMode":
        return "Finalizar";
      default:
        break;
    }
  };
  function renderBottom() {
      return (
        <View style={[styles.row, styles.bottom]}>
          <View>
            <Text style={[styles.text, styles.bottom]}><IconFont5 name='circle' size={10} color={getColorCircle()}/> {data.botCol1}</Text>
          </View>
          {props.displayMode !== "shortMode" ? buildButtonStatus() : null}
        </View>
      );
    return null;
  }
  const getColorCircle = () => {
    switch (data.botCol1) {
      case 'FINALIZADO':
        return "#078BFF"
      case 'ACTIVO':
        return "#11FF00"
      case 'ANULADO':
        return "red"
      case 'PENDIENTE':
        return "gray"
      default:
        return "gray"
    }
  }

  const buildButtonStatus = () => {
    if (data.botCol1 !== 'ANULADO' && data.botCol1 !== 'FINALIZADO') {
      return(
        <View style={styles.button}>
            <Text
              onPress={() => {
                modalHandler();
              }}
              style={[styles.text, styles.bottom, styles.button]}
            >
              {getTittleButton()}
            </Text>
          </View>
      );
    }
    return null;
  }
  const setMargins = {
    marginVertical: displayMode === 'orderMode' ? 10 : 7,
    paddingVertical: displayMode === 'orderMode' ? 10 : 8,
    paddingHorizontal: 12,
  }

  return (
    <View style={{...styles.cardContainer, ...setMargins}}>
      <Pressable style={styles.content} onPress={() => selectionHandler()}>
        <View style={[styles.row, styles.top]}>
          <Text style={[styles.text, styles.top]}>{data.topCol1}</Text>
          <Text style={[styles.text, styles.top]}>#{data.key}</Text>
        </View>
        <View style={[styles.row, styles.middleRow]}>
          <Text style={[styles.text, styles.middle]}>{data.midCol1}</Text>
          {props.displayMode === "loanMode" && (
            <Text style={[styles.text, styles.middle]}>{data.midCol2}</Text>
          )}
        </View>
      </Pressable>
      {renderBottom()}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 8,
    backgroundColor: "#FFF",
    margin: 5,
    borderRadius: 5,
    shadowColor: '#999',
    elevation: 7,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  middleRow: {
    paddingVertical: 12,
  },
  top: {
    color: "#888",
  },
  middle: {
    fontSize: 14,
    color: "#aaa",
  },
  bottom: {
    fontSize: 14,
    color: "#aaa",
    alignItems: "center",
    paddingBottom: 2,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#F9C3C3",
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: "#777",
    fontWeight: "500",
    borderRadius: 15,
  },
});
