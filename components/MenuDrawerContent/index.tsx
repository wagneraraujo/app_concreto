import * as React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'
import { Avatar, Button } from 'react-native-paper'
import { useAuth } from '../../hooks/auth'
import { theme } from '../../theme/theme'
export default function MenuDrawerContent(props: any) {
  const navigation = useNavigation()
  const { user, Logout } = useAuth()

  return (
    <>
      <View style={styles.viewMenu}>
        <DrawerContentScrollView
          contentContainerStyle={{ backgroundColor: '#191919' }}
        >
          <View style={styles.viewHeader}>
            <View>
              <Avatar.Icon size={44} icon="account-circle" />
            </View>

            <View>
              <Text style={styles.colorWhite}>Concreto Serviços</Text>
              <Text style={styles.textEmail}>{user.email}</Text>
              <Text style={styles.colorWhite}>Tipo:{user.tipo_conta}</Text>
            </View>
          </View>

          <View style={styles.listMenu}>
            <DrawerItemList {...props} />
          </View>

          <View style={styles.footerMenuDrawer}>
            <TouchableOpacity style={styles.viewfooter} onPress={Logout}>
              <Text>Sair da conta</Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  viewMenu: {
    flex: 1,
  },
  viewHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  listMenu: {
    backgroundColor: '#fff',
    paddingTop: 8,
  },
  footerMenuDrawer: { backgroundColor: '#fff', marginTop: 1 },
  colorWhite: {
    color: '#d4d4d4',
  },
  textEmail: {
    color: '#fff',
    fontWeight: 'bold',
  },
  viewfooter: {
    padding: 16,
  },
})
