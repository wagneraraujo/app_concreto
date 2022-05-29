import * as React from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper'

const AlertComponent = ({ funcDelete }: any) => {
  const [visible, setVisible] = React.useState(false)

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  const createTwoButtonAlert = () =>
    Alert.alert('Você tem certeza?', 'confirme abaixo', [
      {
        text: 'Não quero',
        onPress: () => console.log('Cancel Pressed'),
        style: 'default',
      },
      {
        text: 'Quero cancelar',
        onPress: funcDelete,
        style: 'default',
      },
    ])
  return (
    <View style={styles.viewAlert}>
      <Button
        icon="tag-off"
        mode="outlined"
        compact
        color="red"
        onPress={createTwoButtonAlert}
      >
        Cancelar Solicitação
      </Button>
    </View>
  )
}

export default AlertComponent

const styles = StyleSheet.create({
  viewAlert: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
  },
  textCancel: {
    color: 'red',
  },
})
