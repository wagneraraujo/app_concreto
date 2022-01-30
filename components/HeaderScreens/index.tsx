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

export const HeaderScreens = ({ title, subtitle }: HeaderProps) => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Title style={styles.title}>{title}</Title>
          <Subheading>{subtitle}</Subheading>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 38,
    marginHorizontal: 5,
  },
  title: {
    color: theme.colors.accent,
  },
})
