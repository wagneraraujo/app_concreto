import React from 'react'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { theme } from '../../theme/theme'
import { RFValue } from 'react-native-responsive-fontsize'

interface ItemServicoProps {
  titulo: string
  progresso: 'Finalizado' | 'Andamento' | 'Aguardando'
  nomeColaborador?: string
  navegacao: any
}

export const ItemServicoCliente = ({
  titulo,
  progresso,
  nomeColaborador,
  navegacao,
}: ItemServicoProps) => {
  function StatusServico() {
    if (progresso === 'Aguardando') {
      return (
        <Text style={{ color: theme.colors.notification }}>Aguardando</Text>
      )
    }
    if (progresso === 'Andamento') {
      return <Text style={{ color: theme.colors.blue }}>Andamento</Text>
    }
    if (progresso === 'Finalizado') {
      return <Text style={{ color: theme.colors.green }}>Finalizado</Text>
    }
    return <></>
  }
  return (
    <>
      <Pressable style={styles.pressable} onPress={navegacao}>
        <View>
          <View>
            <Text style={styles.titleServico}>{titulo}</Text>
          </View>

          <View style={styles.viewProgresso}>
            {/* <Text style={[styles.textProgress]}>{progresso}</Text> */}

            <StatusServico />
          </View>
        </View>
        <AntDesign name="arrowright" size={24} color={theme.colors.primary} />
      </Pressable>
      <View style={styles.separator} />
    </>
  )
}

const styles = StyleSheet.create({
  pressable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: RFValue(10),
  },
  titleServico: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  subTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textEmpresa: {
    color: '#191919',
    fontWeight: 'bold',
    marginRight: RFValue(10),
  },
  textBairro: {
    color: theme.colors.backdrop,
    marginLeft: RFValue(10),
  },
  viewProgresso: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textProgress: {
    marginRight: RFValue(10),
    fontWeight: 'bold',
    color: '#191919',
    // color: theme.colors.darkGreen,
  },
  nomeColaborador: {
    marginLeft: RFValue(10),
  },
  separator: {
    marginVertical: 0,
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.disabled,
  },
})
