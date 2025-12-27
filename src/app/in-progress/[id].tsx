import { useCallback, useState } from 'react';

import { Alert, View } from 'react-native';

import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import { useTargetDatabase } from '@/database/useTargetDatabase';

import { TransactionTypesEnum } from '@/utils/transaction-types';
import { numberToCurrency } from '@/utils/number-to-currency';

import { Loading } from '@/components/Loading';
import { PageHeader } from '@/components/PageHeader';
import { Progress } from '@/components/Progress';
import { List } from '@/components/List';
import { ITransactionData, Transaction } from '@/components/Transaction';
import { Button } from '@/components/Button';

const transactions: ITransactionData[] = [
  {
    id: '1',
    value: 'R$ 20,00',
    date: '12/04/25',
    type: TransactionTypesEnum.Output,
  },
  {
    id: '2',
    value: 'R$ 300,00',
    date: '12/04/25',
    description: 'CDB de 110% no banco XPTO',
    type: TransactionTypesEnum.Input,
  },
];

export default function InProgressScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0,00',
    percentage: 0,
  });

  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possível carregar os detalhes da meta.');
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();

    await Promise.all([fetchDetailsPromise]);

    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: 'edit',
          onPress: () => null,
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item: transaction }) => (
          <Transaction data={transaction} onRemove={() => null} />
        )}
        emptyMessage="Nenhuma transação. Toque em uma nova transação para guardar seu primeiro dinheiro aqui."
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
