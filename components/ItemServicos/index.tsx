import * as React from 'react'
import { Avatar, Checkbox, List, Surface } from 'react-native-paper'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native'
import { theme } from '../../theme/theme'
import { formatCurrency } from '../../utils/formatCurrency'

interface itemServicoProps {
  title: string
  icon?: string
  price?: any
  onPress?: any
  onLongPress?: any
  id?: number
  selected?: any
  qtd: number
  textSelect?: any
}

export const ItemServicos = ({
  title,
  icon,
  price,
  onLongPress,
  onPress,
  id,
  selected,
  qtd,
  textSelect,
}: itemServicoProps) => {
  const [checked, setChecked] = React.useState(false)

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? theme.colors.primary : '#ffffff',
          },
          styles.button,
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <View style={styles.iconContainer}>
          <Avatar.Icon
            size={36}
            color="#fff"
            style={{ backgroundColor: '#191919' }}
            icon={icon}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.titleServico}>{title}</Text>
          <Text style={styles.titleServico}>R$ {formatCurrency(price)}</Text>
        </View>
        <View>
          <Text>{textSelect}</Text>
        </View>
        {textSelect && <View style={styles.overlay} />}
      </Pressable>
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
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: 160,
    borderColor: '#ccc',
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: 8,
    margin: '4%',
    height: 110,
  },

  iconContainer: {
    position: 'relative',
    zIndex: 6,
  },
  titleServico: {
    textAlign: 'center',
    fontSize: 12,
    color: '#191919',
    fontWeight: 'bold',
    marginTop: 2,
    position: 'relative',
    zIndex: 6,
  },
  surface: {
    elevation: 6,
  },

  overlay: {
    position: 'absolute',
    width: '106%',
    height: 80,
    padding: 0,
    backgroundColor: '#d8a61d6f',
    top: 0,
    left: 0,
    zIndex: 1,
  },
})
