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
  RefreshControl,
} from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Portal, Title, List } from 'react-native-paper'
import { theme } from '../../theme/theme'
import { Button, Dialog } from 'react-native-paper'
import {
  deleteServicoId,
  finalizarServiceColaborator,
  getServicoId,
  startServiceColaborador,
  updateServicesIdAdicionais,
} from '../../services/api'
import Loading from '../../components/LoadingScreen'
import { useAuth } from '../../hooks/auth'
import { formatDate } from '../../utils/formatData'
import { formatCurrency } from '../../utils/formatCurrency'
import { red400 } from 'react-native-paper/lib/typescript/styles/colors'
import AlertComponent from '../../components/AlertComponent'
import { TextInput } from 'react-native-paper'
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export const DetalheServicoScreen = () => {
  const [servico, setServico] = useState({} as any)
  const [listInfoAdicionais, setlistInfoAdicionais] = useState('' as any)
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = React.useState(false)
  const [showMoreInfo, setShowMoreinfo] = useState(false)
  const [textInfo, setTextInfo] = useState()
  const [msgSucesso, setmsgSucess] = useState(['', ['']])
  const [refreshing, setRefreshing] = React.useState(false)
  const [statusSend, setStatussend] = React.useState(false)

  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)
  const showMorebtninfo = () => {
    if (showMoreInfo === false) {
      setShowMoreinfo(true)
    } else {
      setShowMoreinfo(false)
    }
  }

  // const [titulo, setTitulo] = useState('' as any)
  // const [nomeEmpresa, setNomeempresa] = useState('' as any)
  // const [descricao, setDescricao] = useState('' as any)
  // const [status, setStatus] = useState('' as any)
  // const [dataSolicitacao, setDatasolicitacao] = useState('' as any)
  // const [endereco, setEndereco] = useState('' as any)
  // const [valor, setValor] = useState(null)
  // const [colaborador, setColaborador] = useState(false)
  // const [telefone, setTelefone] = useState('#' as any)
  const [lastInfo, setLastinfo] = useState('' as any)

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
        // console.log(res)
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
  //cancelar servico
  const cancelarService = (id: number) => {
    deleteServicoId(id, user.token).then((res) => {
      Alert.alert('Deletado com sucesso', '', [
        {
          text: 'Ok',
          style: 'default',
        },
      ])
      setTimeout(() => {
        navigation.navigate('SolicitacoesScreen')
      }, 2000)
    })
  }

  //informacoes adicionais
  const sendUpdateInfoText = () => {
    setStatussend(true)
    if (textInfo === '') {
      Alert.alert(
        'Campo vazio',
        'Digite informa????es adicionais antes de enviar',
        [{ text: 'ok' }],
      )

      return false
    }
    updateServicesIdAdicionais(textInfo, servico.data?.id, user.token)
      .then((res) => {
        // console.log(res)
        setmsgSucess([
          'Adicionado com sucesso, atualizando no servidor...',
          'green',
        ])

        setTimeout(() => {
          setmsgSucess(['', ''])
          setShowMoreinfo(false)
          onRefresh()
        }, 2000)

        setStatussend(false)
      })
      .catch((err) => {
        // console.log(err)
        setmsgSucess(['Algo deu errado, tente novamente', 'red'])
        setTimeout(() => {
          setmsgSucess(['', ''])
        }, 2000)
        setStatussend(false)
      })
  }

  //iniciar servico
  const StartServico = () => {
    startServiceColaborador(route.params.id, 'Iniciado', user.token).then(
      (res) => {
        console.log(res)
        onRefresh()
      },
    )
  }

  //finalizar servi??o
  const finalizarService = () => {
    Alert.alert('Deseja Concluir o servi??o?', 'Clique abaixo para confirmar', [
      {
        text: 'Ainda n??o',
        onPress: () => console.log('ainda n??o'),
      },
      {
        text: '',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Finalizar agora',
        onPress: finalizarServiceAction,
      },
    ])
  }

  const finalizarServiceAction = () => {
    finalizarServiceColaborator(route.params.id, 'Finalizado', user.token)
      .then((res) => {
        console.log('servico finalizado')

        setTimeout(() => {
          navigation.navigate('HomeColaborador')
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onRefresh = React.useCallback(() => {
    getServicoId(route.params?.id)
      .then((res) => {
        setServico(res)
        setLoading(false)
        // console.log(res)
      })
      .catch((err) => {
        console.log('erro:', err)
        setLoading(false)
      })

    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  console.log(
    '=========',
    servico.data?.attributes.tipos_servicos.data[0].attributes.Nome,
  )

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.viewTitleServico}>
            <Title>
              {servico.data?.attributes.tipos_servicos.data[0]?.attributes.Nome
                ? servico.data?.attributes.tipos_servicos.data[0]?.attributes
                    .Nome
                : 'Servi??o #app'}
            </Title>
          </View>
          <View style={styles.viewTitleServico}>
            <Title style={{ color: theme.colors.text }}>
              <Text style={styles.textSmall}>Status:</Text>{' '}
              {servico.data?.attributes.Status_Servicos === 'Iniciado' ? (
                <Text style={{ color: theme.colors.darkGreen, fontSize: 14 }}>
                  {servico.data?.attributes.Status_Servicos}
                </Text>
              ) : (
                <Text style={{ color: theme.colors.gray, fontSize: 14 }}>
                  {servico.data?.attributes.Status_Servicos}
                </Text>
              )}
            </Title>
            <Title style={{ color: theme.colors.darkGreen, fontSize: 14 }}>
              Valor: R${' '}
              {servico.data?.attributes.Valor === null ? (
                <Text>N??o definido</Text>
              ) : (
                formatCurrency(servico.data?.attributes.Valor)
              )}
            </Title>
          </View>

          <View style={styles.viewTwo}>
            <View style={styles.viewCol}>
              <Text>Status Pagamento:</Text>
              <Text style={styles.subTitle}>
                {servico.data?.attributes.Pagamento}
              </Text>
            </View>
          </View>

          <View style={styles.viewTwo}>
            <View style={styles.viewCol}>
              <Text>Empresa:</Text>
              <Text style={styles.subTitle}>
                {servico.data?.attributes.empresa.data.attributes.Nome_Empresa}
              </Text>
              <Text>Endere??o:</Text>
              <Text style={styles.subTitle}>
                {servico.data?.attributes.empresa.data.attributes.Endereco}
              </Text>
            </View>
            <View style={styles.viewCol}>
              <Text style={styles.subTitle}>Data Solicita????o</Text>
              <Text> {formatDate(servico.data?.attributes.createdAt)}</Text>
            </View>
          </View>
          <View style={styles.viewTwo}>
            <View style={styles.viewCol}>
              <Text>Servi??os Solicitados:</Text>
              {servico.data?.attributes.tipos_servicos.data.map((item) => {
                return (
                  <Text key={item.id} style={styles.subTitle}>
                    {item.attributes.Nome}
                  </Text>
                )
              })}
            </View>
          </View>

          {userIsGerente === 'empresa' && (
            <>
              {servico.data?.attributes.colaborador.data === null ? (
                <>
                  <View style={styles.separator} />
                  <Text>
                    N??o foi selecionado um colaborador para este servi??o,
                    aguarde.
                  </Text>
                </>
              ) : (
                <>
                  <View style={styles.separator} />
                  <View style={styles.viewTitleServico}>
                    <Title style={{ color: theme.colors.text }}>
                      <Text style={styles.textSmall}>Colaborador: </Text>
                      <Text style={{ fontSize: 14 }}>
                        {servico.data?.attributes.colaborador.data === null
                          ? ''
                          : servico.data?.attributes.colaborador.data.attributes
                              .Nome}
                      </Text>
                    </Title>

                    <Button
                      compact
                      color={'black'}
                      icon="whatsapp"
                      mode="outlined"
                      style={{ borderRadius: 8 }}
                      labelStyle={{ fontSize: 13 }}
                      onPress={() => {
                        Linking.openURL(
                          `tel:55${servico.data?.attributes.colaborador.data.attributes.Telefone}`,
                        )
                      }}
                    >
                      Ligar
                    </Button>
                  </View>
                </>
              )}

              <Title>A????es de gerente</Title>
              <View style={styles.viewBtnCliente}>
                {/* <Button
                  icon="application-import"
                  compact
                  mode="contained"
                  // onPress={() => {
                  //   // Linking.openURL(`tel:55${telefone}`)
                  // }}
                >
                  Editar Solicita????o
                </Button> */}
                {!servico.data?.attributes.Status_servico ? (
                  <AlertComponent
                    funcDelete={() => cancelarService(servico.data?.id)}
                  />
                ) : (
                  <Text></Text>
                )}
              </View>
            </>
          )}

          {userIsGerente === 'colaborador' && (
            <>
              <View style={styles.separator} />
              <Title>A????es de colaborador</Title>
              <View style={styles.viewBtnCliente}>
                <Button
                  compact
                  color={'black'}
                  icon="phone"
                  mode="outlined"
                  labelStyle={{ fontSize: 11 }}
                  onPress={() => {
                    Linking.openURL(
                      `tel:55${servico.data?.attributes.empresa.data.attributes.Telefone}`,
                    )
                  }}
                >
                  Ligar para cliente
                </Button>

                <Button
                  icon="text"
                  compact
                  mode="outlined"
                  onPress={showMorebtninfo}
                  labelStyle={{ fontSize: 11 }}
                >
                  {showMoreInfo ? 'Fechar Add Infos' : 'Add informa????es'}
                </Button>
              </View>

              {showMoreInfo && (
                <View style={styles.containerViews}>
                  <TextInput
                    label="Digite aqui"
                    mode="outlined"
                    value={servico.data?.attributes.Info_adicionais}
                    multiline
                    numberOfLines={3}
                    onChangeText={(textInfo) => setTextInfo(textInfo)}
                    style={styles.inputAddinfo}
                  />
                  <Button
                    icon="text"
                    mode="contained"
                    onPress={sendUpdateInfoText}
                    disabled={statusSend ? true : false}
                  >
                    {statusSend ? 'Salvando' : 'Salvar informa????o'}
                  </Button>
                </View>
              )}

              <View>
                {msgSucesso != [''] && (
                  <View>
                    <Text color={msgSucesso[1]}>{msgSucesso[0]}</Text>
                  </View>
                )}
              </View>

              <View style={styles.separator} />

              <View style={styles.viewBtnAcao}>
                {servico.data?.attributes.Status_Servicos === 'Iniciado' ? (
                  <Button
                    icon="alert-circle"
                    mode="contained"
                    onPress={
                      servico.data?.attributes.Status_Servicos === 'Finalizado'
                        ? () => {}
                        : finalizarService
                    }
                    compact
                    color={theme.colors.blue}
                    disabled={
                      servico.data?.attributes.Status_Servicos === 'Finalizado'
                        ? true
                        : false
                    }
                  >
                    {servico.data?.attributes.Status_Servicos === 'Finalizado'
                      ? 'Servi??o conclu??do'
                      : 'Finalizar SErvi??o'}
                  </Button>
                ) : (
                  <Text></Text>
                )}

                {servico.data?.attributes.Status_Servicos === 'Aguardando' ? (
                  <Button
                    icon="play-circle"
                    mode="contained"
                    onPress={StartServico}
                    compact
                    color={theme.colors.green}
                  >
                    Iniciar Servi??o
                  </Button>
                ) : (
                  <Text></Text>
                )}

                {/* */}
              </View>
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
    marginHorizontal: RFValue(0),
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
  containerViews: {
    marginVertical: 6,
  },
  inputAddinfo: {
    marginVertical: 6,
  },
})
