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
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown'
import { createServices, getMyEmpresas, getServicos } from '../../services/api'
import Loading from '../../components/LoadingScreen'

export default function NovaSolicitacaoScreen() {
  const [refreshing, setRefreshing] = React.useState(false)
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
  // console.log(newArrayEmpresas)
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
    // No permissions request is necessary for launching the image library
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
    console.log(data)
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
        // createTwoButtonAlert()
        dropdownRef.current.reset()
        dropdownRef2.current.reset()
        reset()
        // navigation.navigate('SolicitacoesScreen')
      })
      .catch((err) => {
        console.log(err)
      })
    dropdownRef.current.reset()

    // navigation.navigate('SolicitacoesScreen')
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
    getData()
      .then(([thenEmpresas, thenServicos]) => {
        setMyEmpresas(thenEmpresas.data)
        setServicos(thenServicos.data)
        // console.log(res)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  // console.log(newArrayServicos)
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.AllView}>
          <View style={styles.ViewCriarSolicitacao}>
            <Text style={styles.textsolicitarservico}>
              Preencha os campos abaixo e detalhe sua solicitação
            </Text>
          </View>

          <View style={styles.viewForm}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Título"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.marginInput}
                />
              )}
              name="titulo"
            />
            {errors.titulo && (
              <Text style={styles.msgErroText}>
                Defina um título, ex: "concertar portão"
              </Text>
            )}

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <View style={styles.linhaSelect}>
                    <Text style={styles.labeldestaque}>Para qual Empresa?</Text>
                    <SelectDropdown
                      dropdownStyle={{ backgroundColor: '#fff', width: 280 }}
                      data={newArrayEmpresas}
                      ref={dropdownRef}
                      defaultButtonText="Escolha empresa"
                      onSelect={(value) => {
                        onChange(value)
                        setValue('empresa', value.id)
                      }}
                      buttonTextAfterSelection={(value, index) => {
                        return value.nome
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.nome
                      }}
                    />
                  </View>
                </>
              )}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <View style={styles.linhaSelect}>
                    <Text style={styles.labeldestaque}>
                      Qual Serviço deseja?
                    </Text>
                    <Text>Senão tiver na lista, pode deixar em branco</Text>
                    <SelectDropdown
                      dropdownStyle={{ backgroundColor: '#fff', width: 280 }}
                      defaultButtonText="Escolha um serviço"
                      data={newArrayServicos}
                      ref={dropdownRef2}
                      onSelect={(value) => {
                        onChange(value)
                        setValue('tipos_servicos', value.id)
                      }}
                      buttonTextAfterSelection={(value, index) => {
                        return value.nome
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.nome
                      }}
                    />
                  </View>
                </>
              )}
            />

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
            {errors.titulo && (
              <Text style={styles.msgErroText}>
                Descreva o serviço que precisa, esse campo não pode ficar vazio
              </Text>
            )}
          </View>
          <View style={styles.viewImages}>
            <Button icon="camera" mode="outlined" compact onPress={pickImage}>
              Enviar Foto{' '}
            </Button>
            {image && (
              <Image source={{ uri: image }} style={styles.imageItem} />
            )}
          </View>

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
        </ScrollView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
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
})
