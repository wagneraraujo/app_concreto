import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ConfigScreen from '../screens/configs'
import { CadastrarEmpresa } from '../screens/empresas/Cadastrar'
import { OkScreen } from '../screens/configs/register_ok'
import ListEmpresasScreen from '../screens/configs/listEmpresas'
import { useAuth } from '../hooks/auth'

//pages

const Stack = createNativeStackNavigator()
export function ConfigStack() {
  // Stack contains Screen & Navigator properties
  const { user } = useAuth()

  const noEmpresa = user.tipo_conta
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        {/* <Stack.Screen name="AddTranscao" component={AddTranscao} /> */}
        <Stack.Screen
          name="ConfigScreen"
          component={ConfigScreen}
          options={{
            headerShown: true,
            title: !noEmpresa ? 'Minha Conta' : 'Gerente/Empresa',
          }}
        />
        <Stack.Screen
          name="CadastrarEmpresa"
          component={CadastrarEmpresa}
          options={{ title: 'Cadastrar minha empresa', headerShown: true }}
        />
        <Stack.Screen
          name="ListEmpresasScreen"
          component={ListEmpresasScreen}
          options={{ title: 'Lista de Empresas', headerShown: true }}
        />
        <Stack.Screen
          name="CadastroEmpresaOk"
          component={OkScreen}
          options={{ title: 'Cadastro concluído', headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
