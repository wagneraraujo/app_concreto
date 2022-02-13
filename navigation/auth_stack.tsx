import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/auth/login'
import { EsqueciSenhaScreen } from '../screens/auth/esqueci_senha'
import { CriarContaScreen } from '../screens/auth/criar_conta'
import { ChoiceRegisterScreen } from '../screens/auth/choice_register'
import { RegisterOk } from '../screens/auth/register_ok'
import { CriarContaEmpresaScreen } from '../screens/auth/criar_conta_empresa'

//pages

const Stack = createNativeStackNavigator()
export function AuthStack() {
  // Stack contains Screen & Navigator properties

  return (
    <Stack.Navigator>
      <Stack.Group>
        {/* <Stack.Screen name="AddTranscao" component={AddTranscao} /> */}
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EsqueciSenhaScreen"
          component={EsqueciSenhaScreen}
          options={{ headerShown: true, title: 'Recuperar Senha' }}
        />
        <Stack.Screen
          name="CriarContaScreen"
          component={CriarContaScreen}
          options={{ headerShown: true, title: 'Criar conta de colaborador' }}
        />
        <Stack.Screen
          name="ChoiceRegisterScreen"
          component={ChoiceRegisterScreen}
          options={{ headerShown: true, title: 'Qual conta deseja criar?' }}
        />
        <Stack.Screen
          name="CriarContaEmpresaScreen"
          component={CriarContaEmpresaScreen}
          options={{ headerShown: true, title: 'Conta para Empresa' }}
        />
        <Stack.Screen
          name="RegisterOk"
          component={RegisterOk}
          options={{ headerShown: false, title: 'Cadastro concluído' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
