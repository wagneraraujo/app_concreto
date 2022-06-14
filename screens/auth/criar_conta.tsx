import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { HeaderScreens } from '../../components/HeaderScreens'
import { useForm, Controller } from 'react-hook-form'

import { theme } from '../../theme/theme'
import { createColaborador, createColaboradorAccount } from '../../services/api'
import Loading from '../../components/LoadingScreen'
export function CriarContaScreen() {
  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [nome, setNome] = React.useState('')
  const [telefone, setTelefone] = React.useState('')
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [errorRegister, setErrorRegister] = useState(false)

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      email: '',
      telefone: '',
      name: '',
    },
  })

  function handleSubmitLogin(data: any) {
    // console.log(data)
    // const newData = JSON.stringify(dataObjForm)
    // console.log(newData)
    setLoading(true)
    createColaboradorAccount(
      data.email,
      data.email,
      data.password,
      data.email,
      data.telefone,
      'colaborador',
      data.name,
    )
      .then((res) => {
        // console.log(res.data.user.id)

        if (res.status == 200) {
          createColaborador(
            res.data.user.id,
            data.name,
            data.telefone,
            res.data.jwt,
          ).then((res) => {
            navigation.navigate('RegisterOk')
          })
        }

        //
      })
      // .then((res) => {

      // })
      .catch((err) => {
        setLoading(false)
        setErrorRegister(true)

        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.viewForm}>
          <HeaderScreens
            title="Concreto Serviços"
            subtitle="Crie sua conta de colaborador"
          />
          <View style={styles.contentForm}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Nome e Sobrenome"
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
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  label="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.spaceInput}
                  right={<TextInput.Icon name="email" />}
                />
              )}
              name="email"
            />
            <Text style={styles.msgInput}>
              Digite um email válido seuemail@gmail.com
            </Text>
            {errors.email && (
              <Text style={styles.msgErroText}>
                Campo Email está vazio ou inválido
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Senha"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.spaceInput}
                  right={<TextInput.Icon name="eye" />}
                />
              )}
              name="password"
            />
            <Text style={styles.msgInput}>Minimo de 6 caracteres</Text>
            {errors.password && (
              <Text style={styles.msgErroText}>
                Crie uma senha para você com minimo de 6 caracteres
              </Text>
            )}
          </View>

          <View style={styles.viewBtn}>
            <Button
              icon="arrow-right"
              mode="contained"
              color={theme.colors.darkGreen}
              onPress={handleSubmit(handleSubmitLogin)}
            >
              Criar Minha Conta
            </Button>
          </View>
          {errorRegister && (
            <Text style={styles.msgErroText}>
              Algo deu errado, tenta novamente, verifique seu email está
              correto.
            </Text>
          )}

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
