import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { HeaderScreens } from '../../components/HeaderScreens'
import { useForm, Controller } from 'react-hook-form'

import { theme } from '../../theme/theme'
import { createEmpresaAccount } from '../../services/api'
export function CriarContaEmpresaScreen() {
  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [nome, setNome] = React.useState('')
  const [telefone, setTelefone] = React.useState('')
  const navigation = useNavigation()
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
    createEmpresaAccount(
      data.email,
      data.email,
      data.password,
      data.name.replace(' ', '_'),
      data.telefone,
      'empresa',
      data.name,
    )
      .then((res) => {
        if (res.status === 200) {
          navigation.navigate('RegisterOk')
        }
      })
      .catch((err) => {
        navigation.navigate('RegisterOk')

        console.log(err)
      })
  }

  return (
    <ScrollView style={styles.viewForm}>
      <HeaderScreens
        title="Conta para Empresa"
        subtitle="Crie sua conta para solicitar serviços"
      />
      <View style={styles.contentForm}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Nome dono ou Gerente"
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
              label="DDD + Telefone principal"
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
              style={styles.spaceInput}
              right={<TextInput.Icon name="email" />}
            />
          )}
          name="email"
        />
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
        {errors.password && (
          <Text style={styles.msgErroText}>Crie uma senha para você</Text>
        )}
      </View>

      <View style={styles.viewBtn}>
        <Button
          icon="arrow-right"
          mode="contained"
          color={theme.colors.blue}
          onPress={handleSubmit(handleSubmitLogin)}
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
  msgErroText: {
    color: 'red',
  },
})
