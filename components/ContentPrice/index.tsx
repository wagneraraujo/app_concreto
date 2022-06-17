import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { theme } from '../../theme/theme'
import { Button, IconButton } from 'react-native-paper'
import { navigationRef } from '../../navigation/RootNavigation'
import { useNavigation } from '@react-navigation/native'

interface resumoProps {
  qtd: any
  price: any
  ids: any
}

export default function ContentPrice({ qtd, price, ids }: resumoProps) {
  const navigation = useNavigation()
  console.log(price)

  const FinalizarServicos = () => {
    if (qtd.length === 0) {
      Alert.alert(
        'Você ainda não adicionou serviços',
        'Adicione serviços a solicitação para finalizar',
        [
          {
            text: 'Ok, obrigado',
            // onPress: () => navigation.navigate('SolicitacoesScreen'),
          },
        ],
      )
      return false
    }
    navigation.navigate('ResumoSolicitacao')
  }

  return (
    <View style={styles.contentResumo}>
      <View style={styles.linhaResumo}>
        <Text style={styles.boldDescricao}>Qtd Serviços:</Text>
        <Text style={styles.descricao}> {Object.keys(qtd).length}</Text>
      </View>

      <View style={styles.linhaResumo}>
        <Text style={styles.boldDescricao}>Valor Total: R$ </Text>
        <Text style={styles.descricao}>{price}</Text>
      </View>

      <TouchableOpacity onPress={FinalizarServicos} style={styles.viewCartItem}>
        <Text style={styles.textsmall}>Finalizar Sol. </Text>
        <IconButton icon="file-document" color="orange" size={18} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  contentResumo: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 6,
    marginTop: -15,
  },
  linhaResumo: {
    flexDirection: 'row',
  },
  boldDescricao: {
    color: '#fff',
    fontSize: 13,
  },
  descricao: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 13,
  },
  viewCartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b34303',
    paddingHorizontal: 4,
  },
  textsmall: {
    fontSize: 13,
    position: 'relative',
    left: 4,
    color: '#fff',
    fontWeight: 'bold',
  },
})
