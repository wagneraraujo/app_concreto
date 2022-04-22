import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { theme } from '../../theme/theme'
import { Button, IconButton } from 'react-native-paper'
import { navigationRef } from '../../navigation/RootNavigation'
import { useNavigation } from '@react-navigation/native'

interface resumoProps {
  qtd: any
  price: any
}

export default function ContentPrice({ qtd, price }: resumoProps) {
  const navigation = useNavigation()
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

      <TouchableOpacity
        onPress={() => navigationRef.navigate('ResumoSolicitacao')}
        style={styles.viewCartItem}
      >
        <Text style={styles.textsmall}>Finalizar Sol. </Text>
        <IconButton icon="file-document" size={20} />
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
  },
  textsmall: {
    fontSize: 13,
  },
})
