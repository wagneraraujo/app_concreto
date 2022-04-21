import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../../theme/theme'

interface resumoProps {
  qtd: any
  price: any
}

export default function ContentPrice({ qtd, price }: resumoProps) {
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
    paddingHorizontal: 16,
  },
  linhaResumo: {
    flexDirection: 'row',
  },
  boldDescricao: {
    color: '#fff',
  },
  descricao: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#fff',
  },
})
