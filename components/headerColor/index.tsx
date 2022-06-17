import React from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Title, useTheme, Subheading } from 'react-native-paper'
import { theme } from '../../theme/theme'
import { Badge } from 'react-native-paper'

interface HeaderProps {
  title?: string
  subtitle?: string
  nameempresa?: string
}

export const HeaderColors = ({ title, subtitle, nameempresa }: HeaderProps) => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Title style={styles.title}>{title}</Title>
          <Text style={styles.razaoSocial}>{nameempresa}</Text>
          <Subheading>{subtitle}</Subheading>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primary,
    width: '100%',
    zIndex: 0,
    position: 'relative',
  },
  title: {
    color: theme.colors.background,
  },
  razaoSocial: {
    fontSize: 16,
    color: theme.colors.blue,
    fontWeight: 'bold',
  },
})
