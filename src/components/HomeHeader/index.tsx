import { Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '@/theme/colors';

import { styles } from './styles';

import { Separator } from '../Separator';
import { ISummaryProps, Summary } from '../Summary';

export type IHomeHeaderProps = {
  total: string;
  input: ISummaryProps;
  output: ISummaryProps;
};

type IProps = {
  data: IHomeHeaderProps;
};

export function HomeHeader({ data }: IProps) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blue[500], colors.blue[800]]}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>

      <Separator color={colors.blue[400]} />

      <View style={styles.summary}>
        <Summary
          data={data.input}
          icon={{ name: 'arrow-upward', color: colors.green[500] }}
        />

        <Summary
          data={data.output}
          icon={{ name: 'arrow-downward', color: colors.red[400] }}
          isRight
        />
      </View>
    </LinearGradient>
  );
}
