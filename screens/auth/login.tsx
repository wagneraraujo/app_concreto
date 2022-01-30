import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { HeaderScreens } from '../../components/HeaderScreens'
import { theme } from '../../theme/theme'
import { useAuth } from '../../hooks/auth'
export function Login() {
  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')

  const navigation = useNavigation()

  const { user, loginAuth } = useAuth()

  function handleSubmitLogin() {
    console.log('dados do form', email, senha)
    loginAuth(email, senha)
  }

  return (
    <ScrollView style={styles.viewForm}>
      <HeaderScreens
        title="Concreto Serviços"
        subtitle="Olá, entre na sua conta agora"
      />
      <View style={styles.contentForm}>
        <TextInput
          label="Email"
          value={email}
          style={styles.spaceInput}
          onChangeText={(text) => setEmail(text)}
          right={<TextInput.Icon name="email" />}
        />
        <TextInput
          label="Password"
          secureTextEntry
          style={styles.spaceInput}
          value={senha}
          right={<TextInput.Icon name="eye" />}
          onChangeText={(text) => setSenha(text)}
        />
      </View>

      <View style={styles.viewBtn}>
        <Button icon="arrow-right" mode="contained" onPress={handleSubmitLogin}>
          Entrar na minha conta
        </Button>
      </View>

      <View style={styles.footerLogin}>
        <Button
          mode="text"
          color={theme.colors.gray}
          onPress={() => navigation.navigate('EsqueciSenhaScreen')}
        >
          Esqueci a senha
        </Button>

        <Button
          mode="text"
          color={theme.colors.gray}
          onPress={() => navigation.navigate('CriarContaScreen')}
        >
          Criar conta
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewForm: {},
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
