import * as React from 'react'
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { NomeUsuario } from '../components/NomeUser'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { ResumoCard } from '../components/ResumoCard'
import { theme } from '../theme/theme'
import { Title } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { ItemServico } from '../components/ItemListaServico'
import { useRoute } from '@react-navigation/native'
import { DrawerMenu } from '../navigation/menu_drawer'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  getAllServicosSolicitados,
  getServicosRelacionadoColaborador,
} from '../services/api'
import Loading from '../components/LoadingScreen'
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

export default function HomeScreen({ navigation }: any) {
  const [refreshing, setRefreshing] = React.useState(false)

  const [servicos, setServicos] = useState<any>([] as any)
  const [loading, setLoading] = useState(true)

  const route = useRoute()
  // const { user } = useAuth()
  const { user } = useAuth()
  console.log(user.meuIdcol)

  useEffect(() => {
    getServicosRelacionadoColaborador(user.meuIdcol)
      .then((res) => {
        // console.log('id busca', res)
        // setServicos(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const onRefresh = React.useCallback(() => {
    getServicosRelacionadoColaborador(user.meuIdcol).then((res) => {
      // console.log(res)
      setServicos(res.data)
      setLoading(false)
    })

    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  // console.log(servicos)
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getServicosRelacionadoColaborador(user.meuIdcol).then((res) => {
        // console.log(res)
        setServicos(res.data)
        setLoading(false)
      })
    })
    return unsubscribe
  }, [navigation])

  // console.log(servicos)

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={styles.containerView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* <NomeUsuario nome="Carlos Alves" /> */}
          <View style={styles.container}>
            <ResumoCard
              nameIcon="alarm-outline"
              sizeIcon={24}
              titleCard="Solitações de serviços"
              qtd={Number(servicos.length)}
              themeColor={theme.colors.primary}
              navegacao={() => console.log('v')}
            />
            <ResumoCard
              nameIcon="cog"
              sizeIcon={24}
              titleCard="Em progresso"
              qtd={0}
              themeColor={theme.colors.accent}
              navegacao={() => console.log('navegacao', {})}
            />
            <ResumoCard
              nameIcon="checkbox"
              sizeIcon={24}
              titleCard="Serviços concluídos"
              qtd={0}
              themeColor={theme.colors.green}
              navegacao={() => console.log('navegacao')}
            />

            <View
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
          </View>

          <View style={styles.containerListaServicos}>
            <Title>Todas Solicitações de clientes tes</Title>

            {servicos.map((item: any) => {
              // console.log(item.attributes.Status_servico)
              const empresa = item.attributes.empresa.data.attributes.Nome_Empresa.substring(
                0,
                20,
              )

              console.log(
                item.attributes.tipos_servicos.data[0]?.attributes.Nome,
              )
              return (
                <ItemServico
                  empresa={empresa}
                  key={item.id}
                  titulo={
                    item.attributes.tipos_servicos.data[0]
                      ? item.attributes.tipos_servicos.data[0]?.attributes.Nome
                      : 'Serviço #app'
                  }
                  progresso={item.attributes.Status_Servicos}
                  bairro={item.attributes.empresa.data.attributes.Endereco.substring(
                    0,
                    45,
                  )}
                  navegacao={() =>
                    navigation.navigate('DetalheServicoScreenColaborador', {
                      id: item.id,
                    })
                  }
                />
              )
            })}
          </View>
        </ScrollView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  containerView: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
})
