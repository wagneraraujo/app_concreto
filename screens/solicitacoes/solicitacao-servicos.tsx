import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
  FlatList,
} from 'react-native'
import { Text, View } from '../../components/Themed'
import { theme } from '../../theme/theme'
import { Button, TextInput, IconButton, Colors } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

import { useAuth } from '../../hooks/auth'
import { createServices, getMyEmpresas, getServicos } from '../../services/api'
import { ItemServico } from '../../components/ItemListaServico'
import { ItemServicos } from '../../components/ItemServicos'
import { useCart } from '../../hooks/cart'
import uuid from 'react-native-uuid'

export default function CreateSolicitacao() {
  const [refreshing, setRefreshing] = React.useState(false)
  const [myEmpresas, setMyEmpresas] = useState([] as any)
  const [servicos, setServicos] = useState([] as any)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const route = useRoute
  const nativation = useNavigation()

  const { add, cart, totalValue, remove } = useCart()
  const getData = () => {
    return Promise.all([getMyEmpresas(user.email), getServicos()])
  }
  useEffect(() => {
    // reset()
    getData()
      .then(([thenEmpresas, thenServicos]) => {
        setMyEmpresas(thenEmpresas.data)
        setServicos(thenServicos.data)
        // console.log(thenServicos)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  //   console.log(servicos)

  return (
    <>
      <View>
        <Text>Nova Solicitacão</Text>
      </View>
      {/* carrinho */}
      <View>
        {cart.map((item: any, index: number) => {
          console.log('index cart page:', item.item.attributes.Nome)
          return (
            <View key={index}>
              <Text>{item.item.attributes.Nome}</Text>

              <IconButton
                icon="delete"
                color={Colors.red500}
                size={20}
                onPress={() => remove(index)}
              />
            </View>
          )
        })}
      </View>
      {/* fim carrinho */}

      <FlatList
        data={servicos}
        contentContainerStyle={styles.viewItem}
        numColumns={2}
        renderItem={({ item, index }) => {
          console.log('index flatlist:', index)
          return (
            <ItemServicos
              onPress={() => add({ item })}
              icon={
                item.attributes.Nome_Icone === null ||
                item.attributes.Nome_Icone === ''
                  ? 'arrow-all'
                  : item.attributes.Nome_Icone
              }
              title={item.attributes.Nome}
              key={item.id}
              qtd={item.attributes.qtd}
              price={item.attributes.Preco}
            />
          )
        }}
      />
      <View>
        <Text>
          <Text>Quantidade: {Object.keys(cart).length}</Text> / Total:{' '}
          <Text>R$ {totalValue}</Text>
        </Text>
      </View>
      {/* {servicos.map((item: any) => {
          console.log(item.attributes.Nome)
        })} */}
    </>
  )
}

const styles = StyleSheet.create({
  viewItem: { flex: 1 },
})
