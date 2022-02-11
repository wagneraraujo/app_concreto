import React from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Title, useTheme, Subheading } from 'react-native-paper'
import { theme } from '../../theme/theme'
import { Badge } from 'react-native-paper'

interface HeaderProps {
  title: string
  subtitle: string
}

export const HeaderColors = ({ title, subtitle }: HeaderProps) => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Title style={styles.title}>{title}</Title>
          <Text style={styles.razaoSocial}>Razao social da e mpresa</Text>
          <Subheading>{subtitle}</Subheading>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 36,
    paddingBottom: 50,
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
    fontSize: 12,
    color: theme.colors.blue,
  },
})
