import { useCallback, useState } from 'react';

import { Alert, StatusBar, View } from 'react-native';

import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

import dayjs from 'dayjs';

import { useTargetDatabase } from '@/database/useTargetDatabase';
import { useTransactionsDatabase } from '@/database/useTransactionsDatabase';

import { TransactionTypesEnum } from '@/utils/transaction-types';
import { numberToCurrency } from '@/utils/number-to-currency';

import { Loading } from '@/components/Loading';
import { PageHeader } from '@/components/PageHeader';
import { Progress } from '@/components/Progress';
import { List } from '@/components/List';
import { ITransactionData, Transaction } from '@/components/Transaction';
import { Button } from '@/components/Button';

export default function InProgressScreen() {
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: '',
    current: 'R$ 0,00',
    target: 'R$ 0,00',
    percentage: 0,
  });
  const [transactions, setTransactions] = useState<ITransactionData[]>([]);

  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargetDetails() {
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

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(
        Number(params.id)
      );

      setTransactions(
        response.map((transaction) => ({
          id: String(transaction.id),
          value: numberToCurrency(transaction.amount),
          date: dayjs(transaction.created_at).format('DD/MM/YYYY [às] HH:mm'),
          description: transaction.observation,
          type:
            transaction.amount < 0
              ? TransactionTypesEnum.Output
              : TransactionTypesEnum.Input,
        }))
      );
    } catch (error) {
      Alert.alert('Erro', 'Nõo foi possível carregar as transações.');
      console.log(error);
    }
  }

  async function transactionRemove(id: string) {
    try {
      await transactionsDatabase.remove(Number(id));

      fetchData();

      Alert.alert('Transação', 'Transação removida com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover a transação.');
      console.log(error);
    }
  }

  async function handleTransactionRemove(id: string) {
    Alert.alert('Remover', 'Deseja realmente remover?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => await transactionRemove(id),
      },
    ]);
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchTargetDetails();
    const fetchTransactionsPromise = fetchTransactions();

    await Promise.all([fetchDetailsPromise, fetchTransactionsPromise]);

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
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <StatusBar barStyle="dark-content" translucent />

      <PageHeader
        title={details.name}
        rightButton={{
          icon: 'edit',
          // COMO VAMOS PASSAR UM PARÂMETRO OPCIONAL, PASSAMOS ASSIM
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item: transaction }) => (
          <Transaction
            data={transaction}
            onRemove={() => handleTransactionRemove(transaction.id)}
          />
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
