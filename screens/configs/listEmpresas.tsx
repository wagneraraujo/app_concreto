import { useNavigation } from '@react-navigation/native'
import { StackActions } from '@react-navigation/native'
import { useEffect, useState } from 'react'

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'
import {
  TextInput,
  Button,
  Title,
  Headline,
  Subheading,
  Avatar,
  Paragraph,
} from 'react-native-paper'
import Loading from '../../components/LoadingScreen'
import { useAuth } from '../../hooks/auth'
import { getMyEmpresas } from '../../services/api'
export default function ListEmpresasScreen() {
  const [empresas, setEmpresas] = useState([] as any)
  const [loading, setLoading] = useState(true)

  const { Logout, user } = useAuth()
  const navigation = useNavigation()

  useEffect(() => {
    getMyEmpresas(user.email)
      .then((res) => {
        setEmpresas(res)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <ScrollView>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Headline>Lista de empresas</Headline>
          <Text>Você pode cadastrar mais de uma empresa.</Text>

          {empresas.data.map((item: any, index: number) => {
            return (
              <View key={index} style={styles.itemEmpresa}>
                <View style={styles.iconList}>
                  <Avatar.Icon size={34} icon="folder" />
                </View>
                <View>
                  <Subheading style={{ fontWeight: 'bold' }}>
                    {item.attributes.Nome_Empresa}
                  </Subheading>
                  <Paragraph style={styles.smallText}>
                    {item.attributes.Endereco}
                  </Paragraph>
                  <Paragraph style={styles.smallText}>
                    CNPJ:{item.attributes.cnpj}
                  </Paragraph>
                  <Paragraph style={styles.smallText}>
                    Tel:{item.attributes.Telefone}
                  </Paragraph>
                </View>
              </View>
            )
          })}

          <Button
            icon="arrow-right"
            mode="contained"
            onPress={() => navigation.navigate('CadastrarEmpresa')}
          >
            Cadastrar Empresa
          </Button>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemEmpresa: {
    marginVertical: 16,
    backgroundColor: '#fff',
    padding: 8,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconList: {
    marginRight: 16,
  },
  smallText: {
    fontSize: 12,
  },
})
