import { ColorValue, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';

export type ISummaryProps = {
  label: string;
  value: string;
};

type IProps = {
  data: ISummaryProps;
  icon: {
    name: keyof typeof MaterialIcons.glyphMap;
    color: ColorValue;
  };
  isLeft?: boolean;
};

export function Summary({ data, icon, isLeft = false }: IProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isLeft && { justifyContent: 'flex-end' }]}>
        <MaterialIcons name={icon.name} color={icon.color} />

        <Text style={styles.label}>{data.label}</Text>
      </View>

      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
}
