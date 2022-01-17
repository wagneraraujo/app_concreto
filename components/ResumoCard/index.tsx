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
  themeColor?: string;
}

export const ResumoCard = ({
  titleCard,
  nameIcon,
  qtd,
  navegacao,
  sizeIcon,
  themeColor,
}: CardItemProps) => {
  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            borderColor: pressed ? themeColor : theme.colors.disabled,
            borderWidth: pressed ? 1 : 1,
          },
          styles.container,
        ]}
        onPress={navegacao}
      >
        <View>
          <Ionicons name={nameIcon} size={sizeIcon} color={themeColor} />
          <Title style={styles.title}>{titleCard}</Title>
        </View>

        <View style={styles.lineFooter}>
          <Badge size={24} style={{ backgroundColor: themeColor }}>
            {qtd}
          </Badge>
          <Text style={[{ color: themeColor }, styles.btnVer]}>Ver +</Text>
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
    width: "30%",
    height: 150,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 15,
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
    fontSize: 12,
  },
});
