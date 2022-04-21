import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
  FlatList,
  TouchableOpacity,
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
import { formatCurrency } from '../../utils/formatCurrency'
import ContentPrice from '../../components/ContentPrice'

export default function CreateSolicitacao() {
  const [refreshing, setRefreshing] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState([] as any)
  const [myEmpresas, setMyEmpresas] = useState([] as any)

  const [servicos, setServicos] = useState([] as any)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const route = useRoute
  const nativation = useNavigation()

  const { add, cart, totalValue, remove, textActivo } = useCart()
  const getData = () => {
    return Promise.all([getMyEmpresas(user.email), getServicos()])
  }
  useEffect(() => {
    // reset()
    getData()
      .then(([thenEmpresas, thenServicos]) => {
        setMyEmpresas(thenEmpresas.data)
        setServicos(thenServicos.data)
        // console.log('servicos ===', thenServicos)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <ContentPrice price={totalValue} qtd={cart} />
      {/* carrinho */}

      <View>
        {cart.map((item: any, index: number) => {
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
      <View>
        <Text>Selecione os serviços</Text>
      </View>
      <FlatList
        data={servicos}
        contentContainerStyle={styles.viewItem}
        numColumns={2}
        renderItem={(itemServico) => {
          return (
            <ItemServicos
              onPress={() => add(itemServico)}
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
            />
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  viewItem: { flex: 1 },
})
