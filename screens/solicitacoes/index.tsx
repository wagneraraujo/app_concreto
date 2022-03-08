import React, { useEffect, useState } from 'react'
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
import { useAuth } from '../../hooks/auth'
import { getServicosSolicitados } from '../../services/api'
import Loading from '../../components/LoadingScreen'

export default function SolicitacoesScreen({ navigation }: any) {
  const [servicos, setServicos] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const route = useRoute()
  const { user } = useAuth()
  useEffect(() => {
    getServicosSolicitados(user.email)
      .then((res) => {
        // console.log(res)
        setServicos(res.data)
        setLoading(false)
      })
      .then((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])
  // console.log('servicos:', servicos)

  let qtdServicos = servicos.length
  let servTotal = servicos.map((item: any, index: number) => {
    return {
      qtd: index,
      item: item,
    }
  })

  let solicitacoesConcluidas = (item: any) =>
    item.attributes.Status === 'Finalizado'

  const servicConcluidos = servicos.filter(solicitacoesConcluidas)
  const servicosConlcuidosQtd = servicConcluidos.length

  console.log('concluidoooooo=========', servicConcluidos)

  return (
    <>
      <ScrollView style={styles.AllView}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <HeaderColors
              title="Solicitações"
              subtitle="Acompanhe suas solicitações"
            />
            <View style={styles.containerResumos}>
              <ResumoCard
                nameIcon="alarm-outline"
                sizeIcon={24}
                titleCard="Serviços Solicitados"
                qtd={qtdServicos}
                themeColor={theme.colors.primary}
                navegacao={() => {}}
              />

              <ResumoCard
                nameIcon="checkbox"
                sizeIcon={24}
                titleCard="Solicitações concluídas"
                qtd={servicosConlcuidosQtd}
                themeColor={theme.colors.green}
                navegacao={() => {}}
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

              {servicos.map((item: any) => {
                const { Titulo, Status } = item.attributes
                return (
                  <ItemServicoCliente
                    key={item.id}
                    titulo={Titulo}
                    progresso={Status}
                    nomeColaborador=""
                    navegacao={() =>
                      navigation.navigate('DetalheSolicitacaoScreen', {
                        id: item.id,
                      })
                    }
                  />
                )
              })}
            </View>
          </>
        )}
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
