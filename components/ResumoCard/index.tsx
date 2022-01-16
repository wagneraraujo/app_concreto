import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Title, useTheme } from "react-native-paper";
import { theme } from "../../theme/theme";
import { Badge } from "react-native-paper";

interface CardItemProps {
  titleCard: string;
  nameIcon: string | any;
  qtd: any;
  navegacao: any;
  sizeIcon: number;
}

export const ResumoCard = ({
  titleCard,
  nameIcon,
  qtd,
  navegacao,
  sizeIcon,
}: CardItemProps) => {
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            borderColor: pressed ? theme.colors.primary : theme.colors.disabled,
            borderWidth: pressed ? 1 : 1,
          },
          styles.container,
        ]}
        onPress={navegacao}
      >
        <View>
          <Ionicons name={nameIcon} size={sizeIcon} color="orange" />
          <Title style={styles.title}>{titleCard}</Title>
        </View>

        <View style={styles.lineFooter}>
          <Badge size={24} style={{ backgroundColor: theme.colors.primary }}>
            {qtd}
          </Badge>
          <Text style={styles.btnVer}>Ver Todas</Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: "40%",
    height: 150,
  },
  title: {
    fontSize: 16,
  },
  pressed: {
    backgroundColor: "#abeafe",
  },
  subtitleCard: {
    fontSize: 14,
  },
  lineFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  btnVer: {
    color: theme.colors.primary,
    fontSize: 12,
  },
});
