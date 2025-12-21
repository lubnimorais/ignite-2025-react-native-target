import { Text, TouchableOpacity, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '@/theme';

import { TransactionTypesEnum } from '@/utils/transaction-types';

import { styles } from './styles';

export type ITransactionData = {
  id: string;
  value: string;
  date: string;
  description?: string;
  type: TransactionTypesEnum;
};

type ITransactionProps = {
  data: ITransactionData;
  onRemove: () => void;
};

export function Transaction({ data, onRemove }: ITransactionProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name={
          data.type === TransactionTypesEnum.Input
            ? 'arrow-upward'
            : 'arrow-downward'
        }
        size={20}
        color={
          data.type === TransactionTypesEnum.Input
            ? colors.blue[500]
            : colors.red[400]
        }
      />

      <View style={styles.info}>
        <Text style={styles.value}>{data.value}</Text>

        <Text style={styles.description} numberOfLines={1}>
          {data.date} {data.description && `• ${data.description}`}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={onRemove}>
        <MaterialIcons name="close" size={18} color={colors.gray[500]} />
      </TouchableOpacity>
    </View>
  );
}
