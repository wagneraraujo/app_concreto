import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button, Modal, Title, Portal } from 'react-native-paper'
import { HeaderScreens } from '../../components/HeaderScreens'
import { theme } from '../../theme/theme'
import { useAuth } from '../../hooks/auth'
import { useForm, Controller } from 'react-hook-form'
import * as RootNavigation from '../../navigation/RootNavigation'

export function ChoiceRegisterScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.contentView}>
      <View style={styles.viewButton}>
        <Title>Quero cadastrar minha Empresa</Title>
        <Text style={styles.textDescription}>
          Para solicitar serviços e suporte
        </Text>

        <Button
          icon="account-check-outline"
          mode="contained"
          onPress={() => navigation.navigate('CriarContaEmpresaScreen')}
        >
          Sou Dono / Gerente
        </Button>
      </View>

      <View style={styles.viewButton}>
        <Title>Sou colaborador</Title>
        <Text style={styles.textDescription}>
          Faço parte da equipe Concreto Serviços
        </Text>

        <Button
          icon="account-check-outline"
          mode="outlined"
          onPress={() => navigation.navigate('CriarContaScreen')}
        >
          Me cadastrar
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  viewButton: {
    marginBottom: 26,
  },
  textDescription: {
    marginBottom: 6,
  },
})
