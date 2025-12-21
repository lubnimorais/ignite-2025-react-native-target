import { View } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { TransactionTypesEnum } from '@/utils/transaction-types';

import { PageHeader } from '@/components/PageHeader';
import { Progress } from '@/components/Progress';
import { List } from '@/components/List';
import { ITransactionData, Transaction } from '@/components/Transaction';
import { Button } from '@/components/Button';

const details = {
  current: 'R$ 580,00',
  target: 'R$ 1.790,00',
  percentage: 25,
};

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
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
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
