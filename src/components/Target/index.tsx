import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';

export type ITargetProps = {
  id?: string;
  name: string;
  percentage: string;
  current: string;
  target: string;
};

type IProps = TouchableOpacityProps & {
  data: ITargetProps;
};

export function Target({ data, ...rest }: IProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {data.name}
        </Text>

        <Text style={styles.status}>
          {data.percentage} • {data.current} de {data.target}
        </Text>
      </View>

      <MaterialIcons name="chevron-right" size={20} />
    </TouchableOpacity>
  );
}
