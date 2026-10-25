import '../global.css';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider as ExpoThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// This is YOUR custom theme provider
import { ThemeProvider as CustomThemeProvider } from '../guest/theme/ThemeContext'; 

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <ExpoThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        {/* We wrap your custom provider inside the Expo one */}
        <CustomThemeProvider>
          <AnimatedSplashOverlay />
          <Stack screenOptions={{ headerShown: false }} />
        </CustomThemeProvider>
      </SafeAreaProvider>
    </ExpoThemeProvider>
  );
}