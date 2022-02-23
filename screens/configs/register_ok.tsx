import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Button, Title } from 'react-native-paper'
import { HeaderScreens } from '../../components/HeaderScreens'
import { theme } from '../../theme/theme'
export function OkScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.viewForm}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/images/success-icon-23201.png')}
      />
      <Title style={styles.textcenter}>Cadastro concluído com sucesso!</Title>
      <Text style={styles.textcenter}>
        Empresa cadastrada, agora você pode solicitar serviços
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewForm: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  contentForm: {
    paddingHorizontal: 20,
  },
  spaceInput: {
    marginVertical: 8,
  },
  viewBtn: {
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  footerLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  tinyLogo: {
    width: 130,
    height: 130,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  textcenter: {
    textAlign: 'center',
  },
})
