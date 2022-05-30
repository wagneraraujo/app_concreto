import * as React from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { StyleSheet, ScrollView, Alert, View, Text } from 'react-native'
import { Colors, IconButton, Button, TextInput } from 'react-native-paper'
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown'
import ContentPrice from '../../components/ContentPrice'
import { useAuth } from '../../hooks/auth'
import { useCart } from '../../hooks/cart'
import { createServices, getMyEmpresas } from '../../services/api'
import { theme } from '../../theme/theme'
import { useForm, Controller } from 'react-hook-form'
import Loading from '../../components/LoadingScreen'
export default function ResumoSolicitacao() {
  const [loading, setLoading] = useState(true)
  const [objid, setObjid] = useState([] as any)
  const [myEmpresas, setMyEmpresas] = useState([] as any)
  const { add, cart, totalValue, remove, textActivo, CleanCart } = useCart()
  const { user } = useAuth()
  const route = useRoute()
  const navigation = useNavigation()
  const getData = () => {
    return Promise.all([getMyEmpresas(user.email)])
  }
  let newArrayEmpresas = myEmpresas.map((empresa: any) => {
    return {
      nome: empresa.attributes.Nome_Empresa,
      id: empresa.id,
    }
  })

  // console.log(cart)

  let arrId: any = []
  let newArrayServicos = cart.map((empresa: any) => {
    arrId.push(empresa.item.id)
  })

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm()
  const dropdownRef = useRef<any>(null)
  const dropdownRef2 = useRef<any>(null)
  useEffect(() => {
    // reset()
    getData()
      .then(([thenEmpresas]) => {
        setMyEmpresas(thenEmpresas.data)

        // console.log(res)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])
  const createTwoButtonAlert = () =>
    Alert.alert(
      'Sua solicitação foi criada com sucesso!',
      'Por favor, aguarde nosso retorno',
      [
        {
          text: 'Ok, obrigado',
          // onPress: () => navigation.navigate('SolicitacoesScreen'),
        },
      ],
    )

  function handleSubmitLogin(data: any) {
    createServices(
      `Solicitação #00${new Date().getMonth()}${new Date().getSeconds()}`,
      data.descricao,
      myEmpresas[0].id,
      arrId,
      user.id,
      user.token,
      user.id,
      totalValue,
    )
      .then((res) => {
        createTwoButtonAlert()
        navigation.navigate('SolicitacoesScreen')
        CleanCart()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //console.log(arrId)
  return (
    <ScrollView style={{ padding: 8 }}>
      <View>
        <Text>Serviços selecionados e mais informações</Text>
      </View>
      {/* carrinho */}
      <View style={styles.viewCart}>
        {totalValue <= 0 ? (
          <Text>Sem serviços adicionados, volte a adicione</Text>
        ) : (
          <Text></Text>
        )}
        {cart.map((item: any, index: number) => {
          return (
            <View key={index} style={styles.lineCart}>
              <Text>{item.item.attributes.Nome}</Text>
              <Text>R$ {item.item.attributes.Preco.toFixed(2)}</Text>
              <IconButton
                icon="delete"
                color={Colors.red500}
                size={20}
                onPress={() => remove(index)}
              />
            </View>
          )
        })}
      </View>
      <View style={styles.totalvalue}>
        <Text style={styles.textTotal}>Total: R$ {totalValue}</Text>
      </View>

      <View style={styles.viewForm}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Descreva com detalhes"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              multiline
              style={styles.marginInput}
              numberOfLines={8}
            />
          )}
          name="descricao"
        />
        {errors.descricao && (
          <Text style={styles.msgErroText}>
            Descreva o serviço que precisa, esse campo não pode ficar vazio
          </Text>
        )}

        <View style={styles.buttonEnviar}>
          <Button
            icon="alert"
            mode="contained"
            onPress={handleSubmit(handleSubmitLogin)}
            color={theme.colors.green}
          >
            Enviar Solicitação
          </Button>
        </View>
      </View>

      {/* fim carrinho */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewCart: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',

    padding: 6,
  },
  lineCart: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  totalvalue: {
    backgroundColor: theme.colors.green,
    padding: 4,
  },
  textTotal: {
    color: '#fff',
    textAlign: 'right',
    paddingHorizontal: 6,
  },

  textsolicitarservico: {
    marginVertical: 16,
    textAlign: 'center',
    color: theme.colors.blue,
    fontWeight: 'bold',
  },
  buttonSolicitarServico: {
    width: 220,
    textAlign: 'center',
    color: theme.colors.blue,
  },
  viewForm: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  msgErroText: {
    color: 'red',
    marginBottom: 6,
  },
  marginInput: {
    marginVertical: 8,
  },
  viewImages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    backgroundColor: '#fff',
  },
  imageItem: {
    width: 70,
    height: 70,
    marginVertical: 8,
  },
  buttonEnviar: {
    paddingHorizontal: 16,
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  picker: {
    backgroundColor: '#ebe8e8',
    marginBottom: 10,
    borderRadius: 0,
    borderColor: '#cacaca',
    borderBottomWidth: 2,
  },
  linhaSelect: {
    width: '100%',
    marginVertical: 6,
  },
  labeldestaque: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})
