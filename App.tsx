import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './theme/theme';
import { withTheme } from 'react-native-paper';

export default function App(props:any) {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
