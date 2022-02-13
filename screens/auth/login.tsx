import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button, Modal, Portal } from 'react-native-paper'
import { HeaderScreens } from '../../components/HeaderScreens'
import { theme } from '../../theme/theme'
import { useAuth } from '../../hooks/auth'
import { useForm, Controller } from 'react-hook-form'
import { ContentModalRegister } from '../../components/ContentModalRegister'

export function Login() {
  const [visible, setVisible] = React.useState(false)

  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  // const onChange = (arg) => {
  //   return {
  //     value: arg.nativeEvent.text,
  //   }
  // }

  const navigation = useNavigation()

  const { user, loginAuth, erroReq } = useAuth()

  function handleSubmitLogin(data: any) {
    // console.log(data)
    loginAuth(data.email, data.password)
    // console.log(data.email, data.senha)
  }

  return (
    <ScrollView style={styles.viewForm}>
      <HeaderScreens
        title="Concreto Serviços"
        subtitle="Olá, entre na sua conta agora"
      />
      <View style={styles.contentForm}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              right={<TextInput.Icon name="email" />}
            />
          )}
          name="email"
        />
        {errors.email && (
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
              label="Password"
              secureTextEntry
              style={styles.spaceInput}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              right={<TextInput.Icon name="eye" />}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.msgErroText}>Digite sua senha</Text>
        )}
      </View>

      <View style={styles.viewBtn}>
        <Button
          icon="arrow-right"
          mode="contained"
          onPress={handleSubmit(handleSubmitLogin)}
        >
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
          onPress={() => navigation.navigate('ChoiceRegisterScreen')}
        >
          Criar Conta
        </Button>
      </View>

      <View style={styles.ViewErro}>
        {erroReq && (
          <Text style={styles.msgErroTextLogin}>
            Email ou senha inválidos, tente novamente
          </Text>
        )}
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
  msgErroText: {
    color: 'red',
  },
  ViewErro: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  msgErroTextLogin: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.notification,
  },
  viewModal: {
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
})
