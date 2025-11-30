import { Button, Text, View } from 'react-native';

import { router } from 'expo-router';

import { fontFamily } from '@/theme/fontFamily';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontFamily: fontFamily.bold }}>Olá, Expo Router</Text>

      <Button title="Nova Meta" onPress={() => router.navigate('/target')} />

      <Button
        title="Transação"
        onPress={() => router.navigate('/transaction/7')}
      />

      <Button
        title="Progresso"
        onPress={() => router.navigate('/in-progress/7')}
      />
    </View>
  );
}
