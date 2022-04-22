import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, ScrollView, Alert, RefreshControl } from 'react-native'
import { Text, View } from '../../components/Themed'
import { theme } from '../../theme/theme'
import { Button, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useAuth } from '../../hooks/auth'
import { List } from 'react-native-paper'

import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown'
import { createServices, getMyEmpresas, getServicos } from '../../services/api'
import Loading from '../../components/LoadingScreen'
import { ItemServico } from '../../components/ItemListaServico'
import { ItemServicos } from '../../components/ItemServicos'
import { formatCurrency } from '../../utils/formatCurrency'
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
export default function Solicitacao() {
  const [refreshing, setRefreshing] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState([] as any)
  const [valoresItems, setValoresItems] = React.useState([] as any)
  const [myEmpresas, setMyEmpresas] = useState([] as any)
  const [servicos, setServicos] = useState([] as any)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const route = useRoute
  const nativation = useNavigation()
  let newArrayEmpresas = myEmpresas.map((empresa: any) => {
    return {
      nome: empresa.attributes.Nome_Empresa,
      id: empresa.id,
    }
  })
  let newArrayServicos = servicos.map((servico: any) => {
    return {
      nome: servico.attributes.Nome,
      id: servico.id,
    }
  })
  const firtEmpresa = newArrayEmpresas[0]

  const navigation = useNavigation()
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titulo: '',
      descricao: '',
      empresa: null,
      tipos_servicos: null,
      // imagens: [],
    },
  })
  const dropdownRef = useRef<any>(null)
  const dropdownRef2 = useRef<any>(null)
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }
  function handleSubmitLogin(data: any) {
    createServices(
      data.titulo,
      data.descricao,
      data.empresa,
      data.tipos_servicos,
      user.id,
      user.token,
      user.id,
    )
      .then((res) => {
        createTwoButtonAlert()
        dropdownRef.current.reset()
        dropdownRef2.current.reset()
        reset()
        navigation.navigate('SolicitacoesScreen')
      })
      .catch((err) => {
        console.log(err)
      })
    dropdownRef.current.reset()
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Sua solicitação foi criada com sucesso!',
      'Por favor, aguarde nosso retorno',
      [
        {
          text: 'Ok',
          // onPress: () => navigation.navigate('SolicitacoesScreen'),
        },
      ],
    )

  const getData = () => {
    return Promise.all([getMyEmpresas(user.email), getServicos()])
  }

  useEffect(() => {
    reset()
    desselect()
    getData()
      .then(([thenEmpresas, thenServicos]) => {
        setMyEmpresas(thenEmpresas.data)
        setServicos(thenServicos.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  //refresh
  const onRefresh = React.useCallback(() => {
    getData().then(([thenEmpresas, thenServicos]) => {
      setMyEmpresas(thenEmpresas.data)
      setServicos(thenServicos.data)
      setLoading(false)
    })

    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  //somar valores
  const valores = (item: any) => 1 * item.attributes.Preco
  const somar = (acc: any, el: any) => acc + el

  const handleOnPress = (item: any) => {
    if (selectedItems.lenght) {
      return selectItems(item.id)
    }
  }
  const selectItems = (item: any) => {
    // console.log(item.attributes.qtd)
    // console.log(item.attributes.Preco)

    if (selectedItems.includes(item.attributes.Nome, item.attributes.Valor)) {
      const newListItems = selectedItems.filter(
        (itemId: any) => itemId !== item.attributes.Nome,
      )

      const newValores = (selectedItems) => item.attributes.Valor

      return {
        selectitems: setSelectedItems(newListItems),
        newvalores: setValoresItems(newValores),
      }
    }

    setSelectedItems([...selectedItems, item.attributes.Nome])
  }

  const getSelected = (item: any) => {
    return selectedItems.includes(item.attributes.Nome)
  }

  const qtdSelected = selectedItems.length
  let valorServico = Number(3.698)

  const desselect = () => setSelectedItems([])

  return (
    <>
      <ScrollView
        style={styles.AllView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.ViewCriarSolicitacao}>
          <Text style={styles.textsolicitarservico}>
            "Segure o toque" para selecionar os serviços
          </Text>
        </View>

        <View style={styles.cartSerivcos}>
          <View style={styles.descriptionCart}>
            <Text> Qtd serviços Seleconados: {qtdSelected}</Text>
          </View>
          <View style={styles.priceCart}>
            <Text>Valor:</Text>
            <Text>R$ {formatCurrency(valorServico)}</Text>
          </View>
        </View>

        <View>
          {selectedItems.map((item, i) => {
            return (
              <>
                <Text key={i}>{item}</Text>
              </>
            )
          })}
        </View>

        <View style={styles.viewServicosItem}>
          {servicos.map((item: any, i: number) => {
            // console.log(item.id)
            return (
              <ItemServicos
                onLongPress={() => selectItems(item)}
                onPress={() => handleOnPress(item)}
                icon={
                  item.attributes.Nome_Icone === null ||
                  item.attributes.Nome_Icone === ''
                    ? 'arrow-all'
                    : item.attributes.Nome_Icone
                }
                title={item.attributes.Nome}
                key={item.id}
                selected={getSelected(item)}
                qtd={item.attributes.qtd}
                price={item.attributes.Preco}
              />
            )
          })}
        </View>

        <Button onPress={() => desselect()}>Remover todos</Button>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  cartSerivcos: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.darkGreen,
    paddingVertical: 6,
    alignItems: 'center',
  },
  priceCart: {
    flexDirection: 'row',
  },
  AllView: {
    backgroundColor: '#fff',
  },
  ViewCriarSolicitacao: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
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
  },
  msgErroText: {
    color: 'red',
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
  viewServicosItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
})
