import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SolicitacoesScreen from '../screens/solicitacoes'
import NovaSolicitacaoScreen from '../screens/solicitacoes/nova_solicitacao'
import { DetalheServicoScreen } from '../screens/servicos/detalheServicoSceen'
import ResumoSolicitacao from '../screens/solicitacoes/resumo'

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
          name="DetalheSolicitacaoScreen"
          component={DetalheServicoScreen}
          options={{ headerShown: true, title: 'Detalhe do Serviço' }}
        />
        <Stack.Screen
          name="ResumoSolicitacao"
          component={ResumoSolicitacao}
          options={{ headerShown: true, title: 'Finalizar solicitação' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
