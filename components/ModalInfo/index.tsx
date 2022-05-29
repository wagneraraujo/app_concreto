import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  Headline,
  Divider,
} from 'react-native-paper'
import Markdown from 'react-native-markdown-display'

const ModalInfo = ({ visible, showModal, hideModal, content, title }: any) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  return (
    <Portal>
      <Modal
        style={styles.modalstyle}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Headline>{title}</Headline>
        <Markdown>{content}</Markdown>
        <Divider style={{ marginVertical: 12 }} />

        <View style={styles.viewmodal}>
          <Button
            icon="close"
            mode="outlined"
            onPress={hideModal}
            color={'red'}
            compact
            style={styles.sizebutton}
          >
            Fechar{' '}
          </Button>
        </View>
      </Modal>
    </Portal>
  )
}

export default ModalInfo

const styles = StyleSheet.create({
  modalstyle: {
    margin: 3,
    padding: 8,
    overflow: 'scroll',
    flex: 1,
  },
  viewmodal: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  sizebutton: {
    maxWidth: '80%',
  },
})
