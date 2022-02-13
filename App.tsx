import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from './theme/theme'
import { withTheme } from 'react-native-paper'
import { AuthProvider, useAuth } from './hooks/auth'
import Loading from './components/LoadingScreen'
export default function App(props: any) {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const { userStorageLoading } = useAuth()
  if (!isLoadingComplete || userStorageLoading) {
    return <Loading />
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <Navigation colorScheme={colorScheme} />
          </AuthProvider>
          <StatusBar />
        </PaperProvider>
      </SafeAreaProvider>
    )
  }
}
