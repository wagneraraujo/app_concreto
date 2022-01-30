import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { HeaderScreens } from '../../components/HeaderScreens'
import { theme } from '../../theme/theme'
export function EsqueciSenhaScreen() {
  const [email, setEmail] = React.useState('')

  const navigation = useNavigation()
  return (
    <View style={styles.viewForm}>
      <HeaderScreens
        title="Concreto Serviços"
        subtitle="Recupere sua senha, te enviaremos um email"
      />
      <View style={styles.contentForm}>
        <TextInput
          label="Email"
          value={email}
          style={styles.spaceInput}
          onChangeText={(text) => setEmail(text)}
          right={<TextInput.Icon name="email" />}
        />
      </View>

      <View style={styles.viewBtn}>
        <Button
          icon="arrow-right"
          mode="contained"
          color={theme.colors.blue}
          onPress={() => console.log('Pressed')}
        >
          Recuperar senha
        </Button>
      </View>

      <View style={styles.footerLogin}>
        <Button
          mode="text"
          color={theme.colors.gray}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          Voltar para o login
        </Button>
      </View>
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
})
