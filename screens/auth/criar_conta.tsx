import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { HeaderScreens } from '../../components/HeaderScreens'
import { theme } from '../../theme/theme'
export function CriarContaScreen() {
  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [nome, setNome] = React.useState('')
  const [telefone, setTelefone] = React.useState('')
  const navigation = useNavigation()
  return (
    <ScrollView style={styles.viewForm}>
      <HeaderScreens
        title="Concreto Serviços"
        subtitle="Crie sua conta de colaborador"
      />
      <View style={styles.contentForm}>
        <TextInput
          label="Nome"
          value={nome}
          style={styles.spaceInput}
          onChangeText={(text) => setNome(text)}
          right={<TextInput.Icon name="account" />}
        />
        <TextInput
          label="Telefone"
          value={telefone}
          keyboardType="decimal-pad"
          style={styles.spaceInput}
          onChangeText={(text) => setTelefone(text)}
          right={<TextInput.Icon name="phone" />}
        />
        <TextInput
          label="Email"
          value={email}
          style={styles.spaceInput}
          onChangeText={(text) => setEmail(text)}
          right={<TextInput.Icon name="email" />}
        />
        <TextInput
          label="Senha"
          secureTextEntry
          style={styles.spaceInput}
          value={senha}
          right={<TextInput.Icon name="eye" />}
          onChangeText={(text) => setSenha(text)}
        />
      </View>

      <View style={styles.viewBtn}>
        <Button
          icon="arrow-right"
          mode="contained"
          color={theme.colors.darkGreen}
          onPress={() => console.log('Pressed')}
        >
          Criar Minha Conta
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
