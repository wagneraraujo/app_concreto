import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native'
import { Text, View } from '../../components/Themed'
import { theme } from '../../theme/theme'
import { Button, TextInput, IconButton, Colors } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

import { useAuth } from '../../hooks/auth'
import {
  createServices,
  getMyEmpresas,
  getServicos,
  getServicosId,
} from '../../services/api'
import { ItemServico } from '../../components/ItemListaServico'
import { ItemServicos } from '../../components/ItemServicos'
import { useCart } from '../../hooks/cart'
import uuid from 'react-native-uuid'
import { formatCurrency } from '../../utils/formatCurrency'
import ContentPrice from '../../components/ContentPrice'
import ModalInfo from '../../components/ModalInfo'
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
export default function CreateSolicitacao() {
  const [refreshing, setRefreshing] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState([] as any)
  const [myEmpresas, setMyEmpresas] = useState([] as any)
  const [visible, setVisible] = React.useState(false)
  const [servicos, setServicos] = useState([] as any)
  const [titleModalServico, setTitleModalServico] = useState(
    'Carregando...' as string,
  )
  const [textModelservico, setTextModalServico] = useState(
    'Carregando detalhes...' as string,
  )
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const route = useRoute
  const nativation = useNavigation()
  const [qtdEmpresas, setQtdEmpresas] = useState<any>([])
  const { add, cart, totalValue, remove, textActivo } = useCart()
  const getData = () => {
    return Promise.all([getMyEmpresas(user.email), getServicos()])
  }
  useEffect(() => {
    getMyEmpresas(user.email).then((res) => {
      setQtdEmpresas(res.data)
    })
    getData()
      .then(([thenEmpresas, thenServicos]) => {
        setMyEmpresas(thenEmpresas.data)
        setServicos(thenServicos.data)
        console.log('servicos ===', thenServicos)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const onRefresh = React.useCallback(() => {
    getData().then(([thenEmpresas, thenServicos]) => {
      setMyEmpresas(thenEmpresas.data)
      setServicos(thenServicos.data)
      // console.log('servicos ===', thenServicos)
      setLoading(false)
    })

    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const DetailService = (id: number) => {
    console.log('buscar tipo servico', id)
  }
  const showModal = (id: number) => {
    setVisible(true)
    getServicosId(id).then((res) => {
      console.log(res.data.attributes.Nome)
      setTitleModalServico(res.data.attributes.Nome)
      setTextModalServico(res.data.attributes.Descricao)
    })
    // console.log('showc', id)
  }
  const hideModal = () => setVisible(false)
  let qtdServicos = servicos.length

  return (
    <>
      <ModalInfo
        hideModal={hideModal}
        showModal={showModal}
        visible={visible}
        content={textModelservico}
        title={titleModalServico}
      />

      {qtdEmpresas.length === 0 ? (
        <View
          style={{
            marginVertical: 16,
            marginHorizontal: 16,
            backgroundColor: 'red',
          }}
        >
          <Text>Antes de solicitar, você precisa cadastrar uma empresa</Text>
        </View>
      ) : (
        <Text>{''}</Text>
      )}

      <SafeAreaView style={{ flex: 1, height: '100%' }}>
        <ContentPrice price={totalValue} qtd={cart} ids={ItemServico} />

        <View style={styles.viewAvisotext}>
          <Text style={styles.textAviso}>
            Toque e segure para selecionar um serviços
          </Text>
        </View>
        <FlatList
          data={servicos}
          contentContainerStyle={styles.viewItem}
          numColumns={2}
          scrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={(itemServico) => {
            return (
              <ItemServicos
                onLongPress={() => add(itemServico)}
                icon={
                  itemServico.item.attributes.Nome_Icone === null ||
                  itemServico.item.attributes.Nome_Icone === ''
                    ? 'arrow-all'
                    : itemServico.item.attributes.Nome_Icone
                }
                title={itemServico.item.attributes.Nome}
                key={itemServico.item.id}
                qtd={itemServico.item.attributes.qtd}
                price={itemServico.item.attributes.Preco}
                textSelect={textActivo}
                onPress={() => showModal(itemServico.item.id)}
              />
            )
          }}
        />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  viewItem: { flex: 1, height: '100%' },
  viewAvisotext: {
    backgroundColor: theme.colors.blue,
    padding: 2,
  },
  textAviso: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: 'bold',
  },
})
