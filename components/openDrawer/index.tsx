import * as React from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { IconButton, Colors } from 'react-native-paper'
export const OpenDrawer = () => {
  const navigation = useNavigation()

  return (
    <>
      <IconButton
        icon="camera"
        color={Colors.blue600}
        size={20}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    </>
  )
}
