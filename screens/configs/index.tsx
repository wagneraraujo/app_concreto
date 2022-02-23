import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useAuth } from '../../hooks/auth'
export default function ConfigScreen() {
  const { Logout, user } = useAuth()
  const navigation = useNavigation()
  console.log(user)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.textN}>{user.email}</Text>
      <Text style={styles.textN}>Nome de usuário: {user.name}</Text>
      <Text style={styles.textN}>Telefone: {user.telefone}</Text>
      <Text style={styles.textN}>Nome: {user.nome_sobrenome}</Text>
      <Text style={styles.textN}>Tipo de Usuário: {user.tipo_conta}</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => navigation.navigate('CadastrarEmpresa')}
      >
        Cadastrar Empresa
      </Button>
      <TouchableOpacity onPress={Logout} style={styles.link}>
        <Text style={styles.linkText}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  textN: {
    color: '#191919',
    textTransform: 'capitalize',
  },
})
