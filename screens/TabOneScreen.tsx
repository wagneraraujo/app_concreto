import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { NomeUsuario } from "../components/NomeUser";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { ResumoCard } from "../components/ResumoCard";
import { theme } from "../theme/theme";
import { Title } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { ItemServico } from "../components/ItemListaServico";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <>
      <ScrollView style={styles.containerView}>
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

        <View style={styles.containerListaServicos}>
          <Title>Solicitações Recentes</Title>

          <ItemServico
            titulo="Manutenção portão eletrônico"
            empresa="Cond. Atelier Life"
            bairro="Caxias do Sul"
            progresso="Não iniciado"
            nomeColaborador=""
            key={1}
          />

          <ItemServico
            titulo="Pintura de parede"
            empresa="Lojão dos fornos"
            bairro="RJ centro"
            progresso="Em progresso"
            nomeColaborador="Marcos Silva"
            key={2}
          />

          <ItemServico
            titulo="Limpeza de poço"
            empresa="Cond. Cidade dos mundos"
            bairro="Caxias do Sul"
            progresso="Concluído"
            nomeColaborador="João Costa"
            key={3}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  containerView: {
    paddingHorizontal: 10,
  },
  container: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
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
  containerListaServicos: {
    backgroundColor: "#fff",
    marginTop: RFValue(16),
  },
});
