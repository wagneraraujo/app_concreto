import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/auth/login'
import { EsqueciSenhaScreen } from '../screens/auth/esqueci_senha'
import { CriarContaScreen } from '../screens/auth/criar_conta'

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
          options={{ headerShown: true, title: 'Criar minha conta' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
