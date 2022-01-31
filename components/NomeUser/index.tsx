import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAuth } from '../../hooks/auth'

export const NomeUsuario = ({ nome }: any) => {
  const { user } = useAuth()
  return (
    <View style={styles.container}>
      <Text style={styles.ola}>Olá, </Text>
      <Text style={styles.nome}>{user.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: RFValue(8),
    paddingLeft: RFValue(10),
  },

  ola: {
    fontSize: RFValue(18),
  },
  nome: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
})
