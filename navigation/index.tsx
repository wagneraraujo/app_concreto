/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import HomeScreen from '../screens/Home'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import { DetalheServicoScreen } from '../screens/servicos/detalheServicoSceen'
import { useAuth } from '../hooks/auth'
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import { AuthStack } from './auth_stack'
import { ConfigStack } from './configs_stack'
import { SolicitacoesAuth } from './solicitacoes_auth'
import { theme } from '../theme/theme'
import { navigationRef } from './RootNavigation'
import NovaSolicitacaoScreen from '../screens/solicitacoes/nova_solicitacao'
import Solicitacao from '../screens/solicitacoes/solicitacao'
import CreateSolicitacao from '../screens/solicitacoes/solicitacao-servicos'
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  const { user } = useAuth()
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      ref={navigationRef}
      // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      theme={DefaultTheme}
    >
      {/* <RootNavigator /> */}
      {/* <AuthStack /> */}
      {user.id ? <RootNavigator /> : <AuthStack />}
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name="DetalheServico"
        component={DetalheServicoScreen}
        options={{ title: 'Detalhe Serviço' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Modal"
          options={{ title: 'Avisos' }}
          component={ModalScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  const { user } = useAuth()

  const noEmpresa = user.tipo_conta
  console.log(noEmpresa)

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        // headerShown: false,
        tabBarStyle: {
          backgroundColor: '#272727',
          borderTopColor: '#000',
          borderTopWidth: 1,
        },
      }}
    >
      {noEmpresa === 'empresa' && (
        <>
          <BottomTab.Screen
            name="Solicitações"
            component={SolicitacoesAuth}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="file-text" color={color} />
              ),
            }}
          />

          <BottomTab.Screen
            name="Solicitacao"
            component={Solicitacao}
            options={{
              headerShown: true,
              title: 'Solicitar Serviço',
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="plus" color={color} />
              ),
            }}
          />
        </>
      )}

      {noEmpresa === 'colaborador' && (
        <>
          <BottomTab.Screen
            name="TabOne"
            component={HomeScreen}
            options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
              title: 'Serviços',
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="home" color={color} />
              ),
              headerRight: () => (
                <Pressable
                  onPress={() => navigation.navigate('Modal')}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}
                >
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme].text}
                    style={{ marginRight: 15 }}
                  />
                </Pressable>
              ),
            })}
          />

          <BottomTab.Screen
            name="meusservicos"
            component={HomeScreen}
            options={{
              title: 'Meus Serviços',
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="codepen" color={color} />
              ),
            }}
          />
        </>
      )}

      <BottomTab.Screen
        name="CreateSolicitacao"
        component={CreateSolicitacao}
        options={{
          headerShown: false,
          title: 'Solicitação',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="configuracoes"
        component={ConfigStack}
        options={{
          headerShown: false,
          title: noEmpresa === 'empresa' ? 'Gerenciar' : 'Minha Conta',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
