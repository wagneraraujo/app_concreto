import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { NomeUsuario } from '../../components/NomeUser'
import { Text, View } from '../../components/Themed'
import { RootTabScreenProps } from '../../types'
import { ResumoCard } from '../../components/ResumoCard'
import { theme } from '../../theme/theme'
import { Divider, Title, Button } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { ItemServico } from '../../components/ItemListaServico'
import { useRoute } from '@react-navigation/native'
import { HeaderColors } from '../../components/headerColor'
import { ItemServicoCliente } from '../../components/ItemListaServicoCliete'

export default function SolicitacoesScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const route = useRoute
  return (
    <>
      <ScrollView style={styles.AllView}>
        <HeaderColors
          title="Solicitações"
          subtitle="Acompanhe suas solicitações"
        />
        <View style={styles.containerResumos}>
          <ResumoCard
            nameIcon="alarm-outline"
            sizeIcon={24}
            titleCard="Serviços Solicitados"
            qtd={5}
            themeColor={theme.colors.primary}
            navegacao={() => console.log('v')}
          />

          <ResumoCard
            nameIcon="checkbox"
            sizeIcon={24}
            titleCard="Solicitações concluídas"
            qtd={3}
            themeColor={theme.colors.green}
            navegacao={() => console.log('navegacao')}
          />
        </View>

        {/* <View style={styles.ViewCriarSolicitacao}>
          <Text style={styles.textsolicitarservico}>
            Deseja solicitar um serviço agora?
          </Text>
          <Button
            icon="alert"
            mode="contained"
            color={theme.colors.blue}
            style={styles.buttonSolicitarServico}
            onPress={() => navigation.navigate('NovaSolicitacaoScreen')}
          >
            Solicitar Serviço
          </Button>
        </View> */}
        <View style={styles.containerListaServicos}>
          <Title>Minhas Solicitações</Title>
          <Divider />

          <ItemServicoCliente
            titulo="Manutenção portão eletrônico"
            progresso="Não iniciado"
            nomeColaborador=""
            key={1}
            navegacao={() => navigation.navigate('DetalheServico', { id: 1 })}
          />

          <ItemServicoCliente
            titulo="Pintura de parede"
            progresso="Em progresso"
            nomeColaborador="Marcos Silva"
            key={2}
            navegacao={() => navigation.navigate('DetalheServico')}
          />
          <ItemServicoCliente
            titulo="Pintura de parede"
            progresso="Não iniciado"
            key={3}
            navegacao={() => navigation.navigate('DetalheServico')}
          />
          <ItemServicoCliente
            titulo="Pintura de parede"
            progresso="Em progresso"
            nomeColaborador="Marcos Silva"
            key={4}
            navegacao={() => navigation.navigate('DetalheServico')}
          />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  AllView: {
    backgroundColor: '#fff',
  },
  containerView: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  containerResumos: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 6,
    position: 'relative',
    backgroundColor: 'transparent',
    top: -36,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  containerListaServicos: {
    backgroundColor: '#fff',
    marginTop: RFValue(16),
    paddingHorizontal: 16,
  },
  ViewCriarSolicitacao: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  textsolicitarservico: {
    marginBottom: 6,
    textAlign: 'center',
    color: theme.colors.blue,
    fontWeight: 'bold',
  },
  buttonSolicitarServico: {
    width: 220,
    textAlign: 'center',
    color: theme.colors.blue,
  },
})
