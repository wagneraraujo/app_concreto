import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SolicitacoesScreen from '../screens/solicitacoes'
import NovaSolicitacaoScreen from '../screens/solicitacoes/nova_solicitacao'

//pages

const Stack = createNativeStackNavigator()
export function SolicitacoesAuth() {
  // Stack contains Screen & Navigator properties

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="SolicitacoesScreen"
          component={SolicitacoesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NovaSolicitacaoScreen"
          component={NovaSolicitacaoScreen}
          options={{ headerShown: true, title: 'Solicitar Serviço' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
