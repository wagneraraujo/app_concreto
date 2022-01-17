import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const NomeUsuario = ({ nome }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>Olá, </Text>
      <Text style={styles.nome}>{nome}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: RFValue(8),
    paddingLeft: RFValue(10),
  },

  nome: {
    fontSize: RFValue(18),
  },
});
