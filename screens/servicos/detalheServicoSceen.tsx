import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
} from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Title } from 'react-native-paper'
import { theme } from '../../theme/theme'
import { Button } from 'react-native-paper'
import { getServicoId } from '../../services/api'
import Loading from '../../components/LoadingScreen'
import { useAuth } from '../../hooks/auth'

export const DetalheServicoScreen = () => {
  const [servico, setServico] = useState<any>()
  const [loading, setLoading] = useState(true)

  const [titulo, setTitulo] = useState('')
  const [nomeEmpresa, setNomeempresa] = useState('')
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState(false)
  const [dataSolicitacao, setDatasolicitacao] = useState('')
  const [endereco, setEndereco] = useState('')
  const [valor, setValor] = useState(null)
  const [colaborador, setColaborador] = useState(false)
  const [telefone, setTelefone] = useState('#')

  const route = useRoute()
  // let abortController = new AbortController()
  const { user } = useAuth()

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
        if (isMounted) {
          // console.log(res)
          setTitulo(res.data.attributes.Titulo)
          setNomeempresa(
            res.data.attributes.empresas.data[0].attributes.Nome_Empresa,
          )
          setDescricao(res.data.attributes.Descricao)
          setStatus(res.data.attributes.Status_servico)
          setValor(res.data.attributes.Valor)
          setEndereco(res.data.attributes.empresas.data[0].attributes.Endereco)
          setTelefone(res.data.attributes.empresas.data[0].attributes.telefone)
          setDatasolicitacao(
            res.data.attributes.createdAt.toLocaleString('pt-BR', options),
          )
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    return () => {
      // abortController.abort()

      isMounted = false
    }
  }, [])

  const userIsGerente = user.tipo_conta

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.viewTitleServico}>
            <Title>{titulo}</Title>
          </View>
          <View style={styles.viewTitleServico}>
            <Title style={{ color: theme.colors.text }}>
              Status:{' '}
              {status === false ? (
                <Text style={styles.valorNaoDefinido}>Não iniciado</Text>
              ) : (
                <Text style={styles.textGreen}>Iniciado</Text>
              )}
            </Title>
            <Title style={{ color: theme.colors.darkGreen }}>
              Valor:{' '}
              {valor === null ? null : (
                <Text style={styles.valorNaoDefinido}>R$ {valor}</Text>
              )}
            </Title>
          </View>
          <View style={styles.viewTwo}>
            <View style={styles.viewCol}>
              <Text style={styles.subTitle}>{nomeEmpresa}</Text>
              <Text>Endereço:</Text>
              <Text style={styles.subTitle}>{endereco}</Text>
            </View>
            <View style={styles.viewCol}>
              <Text style={styles.subTitle}>Data Solicitação</Text>
              <Text>{dataSolicitacao}</Text>

              {colaborador && (
                <>
                  <Text style={styles.subTitle}>Colaborador</Text>
                  <Text>{colaborador}</Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.separator} />

          <View>
            <Title>Mais informações</Title>
            <Text style={styles.textDescricao}>{descricao}</Text>

            {/* <Image
              style={styles.imagens}
              source={{
                uri:
                  'https://www.vidracarialapaz.com.br/wp-content/uploads/2020/12/ESQUADRIA-DE-ALUMINIO_PORTAO.jpg',
              }}
            /> */}
          </View>

          {userIsGerente === 'gerente' && (
            <>
              <Title>Ações Colaborador</Title>
              <View style={styles.viewBtnCliente}>
                <Button
                  icon="phone"
                  mode="outlined"
                  onPress={() => {
                    Linking.openURL(`tel:55${telefone}`)
                  }}
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
