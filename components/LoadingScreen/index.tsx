import * as React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper'
import { theme } from '../../theme/theme'

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />

      <Text>Carregando...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
})
