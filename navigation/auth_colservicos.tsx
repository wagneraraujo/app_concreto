import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/auth/login'
import { EsqueciSenhaScreen } from '../screens/auth/esqueci_senha'
import { CriarContaScreen } from '../screens/auth/criar_conta'
import { ChoiceRegisterScreen } from '../screens/auth/choice_register'
import { RegisterOk } from '../screens/auth/register_ok'
import { CriarContaEmpresaScreen } from '../screens/auth/criar_conta_empresa'
import HomeScreen from '../screens/Home'
import { DetalheServicoScreen } from '../screens/servicos/detalheServicoSceen'
import { OpenDrawer } from '../components/openDrawer'
import ServicosConcluidosCol from '../screens/servicos/servicosConcluidos'

//pages

const Stack = createNativeStackNavigator()
export function StackServicosColaborador() {
  // Stack contains Screen & Navigator properties

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen
          name="HomeColaborador"
          component={HomeScreen}
          options={{
            headerShown: true,
            title: 'Solicitações',
            headerLeft: () => <OpenDrawer />,
          }}
        />

        <Stack.Screen
          name="DetalheServicoScreenColaborador"
          component={DetalheServicoScreen}
          options={{ headerShown: true, title: 'Detalhes' }}
        />

        <Stack.Screen
          name="ServicosConcluidosCol"
          component={ServicosConcluidosCol}
          options={{ headerShown: true, title: 'Detalhes' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
