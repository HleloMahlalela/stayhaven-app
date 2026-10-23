import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#0A0E1A]">
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-semibold text-gray-950 dark:text-white">House Admin Registration</Text>
      </View>
    </SafeAreaView>
  );
}
