import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { HeaderScreens } from '../../components/HeaderScreens'
import { useForm, Controller } from 'react-hook-form'
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}
import { theme } from '../../theme/theme'
import { cadastrarEmpresa, createColaboradorAccount } from '../../services/api'
import Loading from '../../components/LoadingScreen'
import { useAuth } from '../../hooks/auth'
export function CadastrarEmpresa() {
  const [refreshing, setRefreshing] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [nome, setNome] = React.useState('')
  const [telefone, setTelefone] = React.useState('')
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [errorRegister, setErrorRegister] = useState(false)
  const { user } = useAuth()
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      telefone: '',
      name: '',
      endereco: '',
      cnpj: '',
      adminempresa: user.id,
    },
  })

  //refresh
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [cadastrarEmpresa])

  function handleSubmitLogin(data: any) {
    setLoading(true)
    cadastrarEmpresa(
      data.telefone,
      data.name,
      data.endereco,
      data.cnpj,
      user.id,
      user.token,
    )
      .then((res) => {
        if (res.status == 200) {
          reset()
          onRefresh()
          navigation.navigate('CadastroEmpresaOk')
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setErrorRegister(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // async function handleSubmitLogin(data: any) {
  //   cadastrarEmpresa({ data }, user.token)
  // }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.viewForm}>
          <HeaderScreens
            title="Cadastrar Minha Empresa"
            subtitle="Preencha os campos corretamente para solicitar serviços"
          />
          <View style={styles.contentForm}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Razão Social"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.spaceInput}
                  right={<TextInput.Icon name="account" />}
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={styles.msgErroText}>
                Campo está vazio ou email inválido
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="DDD + Telefone"
                  keyboardType="decimal-pad"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.spaceInput}
                  right={<TextInput.Icon name="phone" />}
                />
              )}
              name="telefone"
            />
            {errors.telefone && (
              <Text style={styles.msgErroText}>Campo telefone está vazio</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Endereço"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.spaceInput}
                  right={<TextInput.Icon name="map-marker" />}
                />
              )}
              name="endereco"
            />
            {errors.endereco && (
              <Text style={styles.msgErroText}>Campo endereço está vazio</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="CNPJ"
                  onBlur={onBlur}
                  keyboardType="number-pad"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.spaceInput}
                  right={<TextInput.Icon name="domain" />}
                />
              )}
              name="cnpj"
            />
            {errors.cnpj && (
              <Text style={styles.msgErroText}>Campo CNPJ está vazio</Text>
            )}
          </View>

          <View style={styles.viewBtn}>
            <Button
              icon="arrow-right"
              mode="contained"
              color={theme.colors.onSurface}
              onPress={handleSubmit(handleSubmitLogin)}
            >
              Cadastrar Empresa
            </Button>
          </View>
          {errorRegister && (
            <Text style={styles.msgErroText}>
              Algo deu errado, tenta novamente, confirme os dados.
            </Text>
          )}
        </ScrollView>
      )}
    </>
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
  msgErroText: {
    color: 'red',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  msgInput: {
    fontSize: 11,
    color: '#707070',
    paddingHorizontal: 16,
    marginTop: -8,
  },
})
