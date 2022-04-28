import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper'

const ModalInfo = ({ visible, showModal, hideModal }: any) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  return (
    <Portal>
      <Modal
        style={styles.modalstyle}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </Portal>
  )
}

export default ModalInfo

const styles = StyleSheet.create({
  modalstyle: {
    margin: 3,
    padding: 8,
  },
})
