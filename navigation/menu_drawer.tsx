import * as React from 'react'

import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ColorSchemeName, Pressable } from 'react-native'
import { Text } from 'react-native'

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ResumoSolicitacao from '../screens/solicitacoes/resumo'
import MenuDrawerContent from '../components/MenuDrawerContent'

import Solicitacao from '../screens/solicitacoes/_solicitacao'
import HomeScreen from '../screens/Home'
import SolicitacoesScreen from '../screens/solicitacoes'
import CreateSolicitacao from '../screens/solicitacoes/solicitacao-servicos'
import { SolicitacoesAuth } from './solicitacoes_auth'
import { useAuth } from '../hooks/auth'
import { ConfigStack } from './configs_stack'
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5'
import { StackServicosColaborador } from './auth_colservicos'
import ServicosConcluidosCol from '../screens/servicos/servicosConcluidos'

const Drawer = createDrawerNavigator()
export const DrawerMenu = () => {
  const { user } = useAuth()

  const noEmpresa = user.tipo_conta
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#fed7aa',
        drawerActiveTintColor: '#c2410c',
        drawerInactiveTintColor: '#757575',
        drawerInactiveBackgroundColor: '#fff',
        headerPressOpacity: 20,
      }}
      drawerContent={(props) => <MenuDrawerContent {...props} />}
    >
      {noEmpresa === 'empresa' && (
        <>
          <Drawer.Screen
            name="CreateSolicitacao"
            component={CreateSolicitacao}
            options={{
              headerTitle: 'Criar solicitação',
              title: 'Criar Solicitação',
            }}
          />
          <Drawer.Screen
            name="SolicitacoesAuth"
            component={SolicitacoesAuth}
            options={{
              headerTitle: 'Minhas Solicitações',
              title: 'Minhas Solicitações',
            }}
          />
          {/* <Drawer.Screen
            name="SolicitacoesAuth"
            component={SolicitacoesAuth}
            options={{
              headerTitle: 'Solicitações concluídas',
              title: 'Solicitações concluídas',
            }}
          /> */}
        </>
      )}

      {noEmpresa === 'colaborador' && (
        <>
          <Drawer.Screen
            name="StackServicosColaborador"
            component={StackServicosColaborador}
            options={{
              headerShown: false,
              title: 'Solicitações',
            }}
          />
          <Drawer.Screen
            name="ServicosConcluidosCol"
            component={ServicosConcluidosCol}
            options={{
              headerShown: true,
              title: 'Solicitações Concluidas',
            }}
          />
        </>
      )}
      <Drawer.Screen
        name="ConfigStack"
        component={ConfigStack}
        options={{
          headerTitle:
            noEmpresa === 'colaborador' ? 'Minha Conta' : 'Gerente/Empresa',
          title:
            noEmpresa === 'colaborador' ? 'Minha Conta' : 'Gerente/Empresa',
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  )
}
