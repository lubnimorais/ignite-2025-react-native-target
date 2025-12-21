import { StatusBar, View } from 'react-native';

import { router } from 'expo-router';

import { HomeHeader } from '@/components/HomeHeader';
import { Target } from '@/components/Target';
import { List } from '@/components/List';
import { Button } from '@/components/Button';

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6.184,90' },
  output: { label: 'Saídas', value: 'R$ 883,65' },
};

const targets = [
  {
    id: '1',
    name: 'Apple Watch',
    percentage: '50%',
    current: 'R$ 580,00',
    target: 'R$ 1.790,00',
  },
  {
    id: '2',
    name: 'Comprar uma cadeira ergonômica',
    percentage: '75%',
    current: 'R$ 900,00',
    target: 'R$ 1.200,00',
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent />

      <HomeHeader data={summary} />

      <List
        containerStyle={{ paddingHorizontal: 24 }}
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item: target }) => (
          <Target
            data={target}
            onPress={() => router.navigate(`/in-progress/${target.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta. Toque em nova meta pra criar."
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  );
}
