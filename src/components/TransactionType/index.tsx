import { View } from 'react-native';

import { colors } from '@/theme';

import { TransactionTypesEnum } from '@/utils/transaction-types';

import { Option } from './options';

import { styles } from './styles';

type ITransactionTypeProps = {
  selected: TransactionTypesEnum;
  onChange: (type: TransactionTypesEnum) => void;
};

export function TransactionType({ selected, onChange }: ITransactionTypeProps) {
  return (
    <View style={styles.container}>
      <Option
        icon="arrow-upward"
        title="Guardar"
        isSelected={selected === TransactionTypesEnum.Input}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypesEnum.Input)}
      />

      <Option
        icon="arrow-downward"
        title="Resgatar"
        isSelected={selected === TransactionTypesEnum.Output}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypesEnum.Output)}
      />
    </View>
  );
}
