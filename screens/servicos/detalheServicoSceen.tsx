import { useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Title } from "react-native-paper";
import { theme } from "../../theme/theme";
import { Button } from "react-native-paper";

interface ItemServicoProps {
  titulo: string;
  empresa: string;
  bairro: string;
  progresso: "Em progresso" | "Não iniciado" | "Concluído";
  nomeColaborador?: string;
}
export const DetalheServicoScreen = ({
  titulo,
  empresa,
  bairro,
  progresso,
  nomeColaborador,
}: ItemServicoProps) => {
  const route = useRoute;
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.viewTitleServico}>
          <Title>Manutenção portão eletrônico</Title>
        </View>
        <View style={styles.viewTitleServico}>
          <Title style={{ color: theme.colors.darkGreen }}>
            Valor: R$ 230.00
          </Title>
        </View>
        <View style={styles.viewTwo}>
          <View style={styles.viewCol}>
            <Text style={styles.subTitle}>Condominio Atelier life</Text>
            <Text>Baixada Santista</Text>
            <Text style={styles.subTitle}>
              Endereço completo aqui teste aqu mesmo
            </Text>
          </View>
          <View style={styles.viewCol}>
            <Text style={styles.subTitle}>Data Solicitação</Text>
            <Text>22/02</Text>

            <Text style={styles.subTitle}>Colaborador</Text>
            <Text>Carlos Alves</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View>
          <Title>Mais informações</Title>
          <Text style={styles.textDescricao}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
            repellat odio excepturi quaerat assumenda voluptate, culpa molestiae
            recusandae omnis maiores quam consectetur vel dicta blanditiis
            distinctio natus corrupti sapiente enim?
          </Text>

          <Image
            style={styles.imagens}
            source={{
              uri: "https://www.vidracarialapaz.com.br/wp-content/uploads/2020/12/ESQUADRIA-DE-ALUMINIO_PORTAO.jpg",
            }}
          />
        </View>
        <Title>Ações Colaborador</Title>
        <View style={styles.viewBtnCliente}>
          <Button
            icon="phone"
            mode="outlined"
            onPress={() => console.log("Pressed")}
          >
            Ligar cliente
          </Button>

          <Button
            icon="text"
            mode="outlined"
            onPress={() => console.log("Pressed")}
          >
            Add infos
          </Button>
        </View>
        <View style={styles.separator} />

        <View style={styles.viewBtnAcao}>
          <Button
            icon="play-circle"
            mode="contained"
            onPress={() => console.log("Pressed")}
            compact
            color={theme.colors.green}
          >
            Aceitar Serviço
          </Button>

          <Button
            icon="play-circle"
            mode="contained"
            onPress={() => console.log("Pressed")}
            compact
            color={theme.colors.darkGreen}
          >
            Finalizar Serviço
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(16),
  },
  viewTitleServico: {
    marginBottom: RFValue(10),
  },
  viewTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewCol: {
    width: RFPercentage(36),
    marginHorizontal: RFValue(6),
  },
  subTitle: {
    fontSize: RFValue(16),
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.accent,
  },
  textDescricao: {
    fontSize: RFValue(18),
    color: "#191919",
    marginBottom: 2,
  },
  imagens: {
    width: RFPercentage(100),
    height: RFPercentage(80),
    resizeMode: "contain",
    marginTop: 0,
  },
  viewBtnCliente: {
    marginBottom: RFValue(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewBtnAcao: {
    marginBottom: RFValue(40),
  },
});
