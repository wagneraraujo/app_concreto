import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Portal, Title } from 'react-native-paper'
import { theme } from '../../theme/theme'
import { Button, Dialog } from 'react-native-paper'
import { deleteServicoId, getServicoId } from '../../services/api'
import Loading from '../../components/LoadingScreen'
import { useAuth } from '../../hooks/auth'
import { formatDate } from '../../utils/formatData'
import { formatCurrency } from '../../utils/formatCurrency'
import { red400 } from 'react-native-paper/lib/typescript/styles/colors'
import AlertComponent from '../../components/AlertComponent'

export const DetalheServicoScreen = () => {
  const [servico, setServico] = useState({} as any)
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = React.useState(false)

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  // const [titulo, setTitulo] = useState('' as any)
  // const [nomeEmpresa, setNomeempresa] = useState('' as any)
  // const [descricao, setDescricao] = useState('' as any)
  // const [status, setStatus] = useState('' as any)
  // const [dataSolicitacao, setDatasolicitacao] = useState('' as any)
  // const [endereco, setEndereco] = useState('' as any)
  // const [valor, setValor] = useState(null)
  // const [colaborador, setColaborador] = useState(false)
  // const [telefone, setTelefone] = useState('#' as any)

  const route = useRoute()
  // let abortController = new AbortController()
  const { user } = useAuth()
  const navigation = useNavigation()

  useEffect(() => {
    let isMounted = true
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    getServicoId(route.params?.id)
      .then((res) => {
        setServico(res)
        setLoading(false)

        console.log(res)
        // // console.log(res.data.attributes.empresa.data.attributes.Nome_Empresa)
        // setTitulo(res.data.attributes.Titulo)
        // setNomeempresa(
        //   res.data.attributes.empresa.data[0].attributes.Nome_Empresa,
        // )
        // setDescricao(res.data.attributes.Descricao)
        // setStatus(res.data.attributes.Status)
        // setValor(res.data.attributes.Valor)
        // setEndereco(res.data.attributes.empresas.data[0].attributes.Endereco)
        // setTelefone(res.data.attributes.empresas.data[0].attributes.telefone)
        // setDatasolicitacao(
        //   res.data.attributes.createdAt.toLocaleString('pt-BR', options),
        // )
      })
      .catch((err) => {
        console.log('erro:', err)
        setLoading(false)
      })
    return () => {
      // abortController.abort()

      isMounted = false
    }
  }, [])

  const userIsGerente = user.tipo_conta
  // const serviceIniciado = servico.data.attributes.Status_servico
  // console.log(serviceIniciado)

  const cancelarService = (id: number) => {
    // console.log('deseja cancelar ', id)
    deleteServicoId(id, user.token).then((res) => {
      Alert.alert('Deletado com sucesso', '', [
        {
          text: 'Ok',
          onPress: () => console.log('Cancel Pressed'),
          style: 'default',
        },
      ])
      setTimeout(() => {
        navigation.navigate('SolicitacoesScreen')
      }, 2000)
    })
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.viewTitleServico}>
            <Title>{servico.data.attributes.Titulo}</Title>
          </View>
          <View style={styles.viewTitleServico}>
            <Title style={{ color: theme.colors.text }}>
              <Text style={styles.textSmall}>Status:</Text>{' '}
              {!servico.data.attributes.Status_servico ? (
                <Text style={{ fontSize: 14 }}>Não iniciado</Text>
              ) : (
                <Text style={{ fontSize: 14, color: 'green' }}>Iniciado</Text>
              )}
            </Title>
            <Title style={{ color: theme.colors.darkGreen, fontSize: 14 }}>
              Valor: R${' '}
              {servico.data.attributes.Valor === null ? (
                <Text>Não definido</Text>
              ) : (
                formatCurrency(servico.data.attributes.Valor)
              )}
            </Title>
          </View>
          <View style={styles.viewTwo}>
            <View style={styles.viewCol}>
              <Text style={styles.subTitle}>
                {servico.data.attributes.empresa.data.attributes.Nome_Empresa}
              </Text>
              <Text>Endereço:</Text>
              <Text style={styles.subTitle}>
                {servico.data.attributes.empresa.data.attributes.Endereco}
              </Text>
            </View>
            <View style={styles.viewCol}>
              <Text style={styles.subTitle}>Data Solicitação</Text>
              <Text> {formatDate(servico.data.attributes.createdAt)}</Text>

              {/* {colaborador && (
                <>
                  <Text style={styles.subTitle}>Colaborador</Text>
                  <Text>{colaborador}</Text>
                </>
              )} */}
            </View>
          </View>

          <View style={styles.separator} />

          <View>
            <Title>Mais informações</Title>
            <Text style={styles.textDescricao}>
              {servico.data.attributes.Descricao}
            </Text>

            {/* <Image
              style={styles.imagens}
              source={{
                uri:
                  'https://www.vidracarialapaz.com.br/wp-content/uploads/2020/12/ESQUADRIA-DE-ALUMINIO_PORTAO.jpg',
              }}
            /> */}
          </View>

          {userIsGerente === 'empresa' && (
            <>
              <Title>Ações de gerente</Title>
              <View style={styles.viewBtnCliente}>
                {/* <Button
                  icon="application-import"
                  compact
                  mode="contained"
                  // onPress={() => {
                  //   // Linking.openURL(`tel:55${telefone}`)
                  // }}
                >
                  Editar Solicitação
                </Button> */}
                {!servico.data.attributes.Status_servico ? (
                  <AlertComponent
                    funcDelete={() => cancelarService(servico.data.id)}
                  />
                ) : (
                  <Text></Text>
                )}
              </View>
            </>
          )}

          {userIsGerente === 'colaborador' && (
            <>
              <Title>Ações de colaborador</Title>
              <View style={styles.viewBtnCliente}>
                <Button
                  icon="phone"
                  mode="outlined"
                  // onPress={() => {
                  //   // Linking.openURL(`tel:55${telefone}`)
                  // }}
                >
                  Ligar cliente
                </Button>

                <Button
                  icon="text"
                  mode="outlined"
                  onPress={() => console.log('Pressed')}
                >
                  Add infos
                </Button>
              </View>
              <View style={styles.separator} />
              <Text>Nenhum colaborador foi selecionado para este serviço</Text>
              {/* 
              <View style={styles.viewBtnAcao}>
                <Button
                  icon="play-circle"
                  mode="contained"
                  onPress={() => console.log('Pressed')}
                  compact
                  color={theme.colors.green}
                >
                  Aceitar Serviço
                </Button>

                <Button
                  icon="play-circle"
                  mode="contained"
                  onPress={() => console.log('Pressed')}
                  compact
                  color={theme.colors.darkGreen}
                >
                  Finalizar Serviço
                </Button>
              </View> */}
            </>
          )}
        </ScrollView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(16),
    position: 'relative',
    zIndex: 1,
  },
  viewTitleServico: {
    marginBottom: RFValue(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewTwo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  viewCol: {
    width: RFPercentage(36),
    marginHorizontal: RFValue(6),
    marginVertical: 6,
  },
  subTitle: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.accent,
  },
  textDescricao: {
    fontSize: RFValue(18),
    color: '#191919',
    marginBottom: 2,
  },
  imagens: {
    width: RFPercentage(100),
    height: RFPercentage(80),
    resizeMode: 'contain',
    marginTop: 0,
  },
  viewBtnCliente: {
    marginBottom: RFValue(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 6,
    width: '100%',
  },
  viewBtnAcao: {
    marginBottom: RFValue(40),
  },
  valorNaoDefinido: {
    color: '#757575',
    fontSize: 14,
  },
  textSmall: {
    color: '#757575',
    fontSize: 14,
  },
  textGreen: {
    color: '#00a767',
    fontSize: 14,
    fontWeight: 'bold',
  },
})
