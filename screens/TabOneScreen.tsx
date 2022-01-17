import { StyleSheet } from "react-native";
import { NomeUsuario } from "../components/NomeUser";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { ResumoCard } from "../components/ResumoCard";
import { theme } from "../theme/theme";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <>
      <NomeUsuario nome="Carlos Alves" />
      <View style={styles.container}>
        <ResumoCard
          nameIcon="alarm-outline"
          sizeIcon={24}
          titleCard="Solitações de serviços"
          qtd={6}
          themeColor={theme.colors.primary}
          navegacao={() => console.log("navegacao")}
        />
        <ResumoCard
          nameIcon="cog"
          sizeIcon={24}
          titleCard="Em andamento"
          qtd={6}
          themeColor={theme.colors.accent}
          navegacao={() => console.log("navegacao")}
        />
        <ResumoCard
          nameIcon="checkbox"
          sizeIcon={24}
          titleCard="Serviços concluídos"
          qtd={6}
          themeColor={theme.colors.green}
          navegacao={() => console.log("navegacao")}
        />

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
