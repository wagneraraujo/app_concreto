import React from 'react'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { theme } from '../../theme/theme'
import { RFValue } from 'react-native-responsive-fontsize'

interface ItemServicoProps {
  titulo: string
  empresa?: string
  bairro?: string
  progresso: Boolean
  nomeColaborador?: string
  navegacao: any
}
export const ItemServico = ({
  titulo,
  empresa,
  bairro,
  progresso,
  nomeColaborador,
  navegacao,
}: ItemServicoProps) => {
  return (
    <>
      <Pressable style={styles.pressable} onPress={navegacao}>
        <View>
          <View>
            <Text style={styles.titleServico}>{titulo}</Text>
          </View>

          <View style={styles.subTitle}>
            <Text style={styles.textEmpresa}>{empresa}</Text>

            <Text>/</Text>
            <Text style={styles.textBairro}>{bairro}</Text>
          </View>
          <View style={styles.viewProgresso}>
            {!progresso ? (
              <Text
                style={[
                  {
                    color: theme.colors.error,
                  },

                  styles.textProgress,
                ]}
              >
                Não iniciado
              </Text>
            ) : (
              <Text
                style={[
                  {
                    color: theme.colors.green,
                  },

                  styles.textProgress,
                ]}
              >
                Iniciado
              </Text>
            )}

            {!progresso ? (
              <Text style={styles.textBairro}></Text>
            ) : (
              <Text style={styles.textBairro}>por {nomeColaborador}</Text>
            )}
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
  },
  subTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textEmpresa: {
    color: '#191919',
    fontWeight: '100',
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
