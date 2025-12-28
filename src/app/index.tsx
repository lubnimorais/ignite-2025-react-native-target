import { useCallback, useState } from 'react';

import { Alert, StatusBar, View } from 'react-native';

import { router, useFocusEffect } from 'expo-router';

import { useTargetDatabase } from '@/database/useTargetDatabase';
import { useTransactionsDatabase } from '@/database/useTransactionsDatabase';

import { numberToCurrency } from '@/utils/number-to-currency';

import { Loading } from '@/components/Loading';
import { HomeHeader, IHomeHeaderData } from '@/components/HomeHeader';
import { ITargetData, Target } from '@/components/Target';
import { List } from '@/components/List';
import { Button } from '@/components/Button';

export default function Index() {
  const [isFetching, setIsFetching] = useState(true);
  const [summary, setSummary] = useState<IHomeHeaderData>();
  const [targets, setTargets] = useState<ITargetData[]>([]);

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargets(): Promise<ITargetData[]> {
    try {
      const response = await targetDatabase.listByClosestTarget();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: `${item.percentage.toFixed(0)}%`,
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possível carregar as metas.');
      console.log(error);
    }
  }

  async function fetchSummary(): Promise<IHomeHeaderData> {
    try {
      const response = await transactionsDatabase.summary();

      return {
        total: numberToCurrency(response.input + response.output),
        input: { label: 'Entradas', value: numberToCurrency(response.input) },
        output: { label: 'Saídas', value: numberToCurrency(response.output) },
      };
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o resumo.');
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    const summaryDataPromise = fetchSummary();

    const [targetData, summaryData] = await Promise.all([
      targetDataPromise,
      summaryDataPromise,
    ]);

    setTargets(targetData);
    setSummary(summaryData);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent />

      <HomeHeader data={summary} />

      <List
        containerStyle={{ paddingHorizontal: 24 }}
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id.toString()}
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
