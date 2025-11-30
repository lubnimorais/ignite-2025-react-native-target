import { Button, Text, View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

export default function InProgressScreen() {
  const params = useLocalSearchParams<{ id: string}>()

  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <Text>In Progress: {params.id}</Text>

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  )
}