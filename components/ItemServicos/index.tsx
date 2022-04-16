import * as React from 'react'
import { Avatar, Checkbox, List } from 'react-native-paper'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar'
export const ItemServicos = () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <>
      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Avatar.Icon
            size={36}
            color="#fff"
            style={{ backgroundColor: '#191919' }}
            icon="alert-box-outline"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.titleServico}>Manuteção Portão</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Avatar.Icon
            size={36}
            color="#fff"
            style={{ backgroundColor: '#191919' }}
            icon="alert-box-outline"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.titleServico}>
            Manuteção Portão test titulo maior
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 2,
  },
  button: {
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: 140,
    textAlign: 'center',
    borderWidth: 0.7,
    borderRadius: 8,
    borderColor: '#191919',
    backgroundColor: '#ececec',
    margin: 4,
    height: 80,
  },

  iconContainer: {},
  titleServico: {
    textAlign: 'center',
    fontSize: 12,
  },
})
