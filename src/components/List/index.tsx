import {
  FlatList,
  FlatListProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '@/theme';

import { styles } from './style';
import { Separator } from '../Separator';

/** A FLATLIST INFERE O TIPO
 * BASEADO NO CONTEÚDO DA LISTA
 * COMO NÃO TEMOS ESSA INFORMAÇÃO
 * TRABALHAREMOS COM GENERIC.
 * QUEM VAI DEFINIR O CONTEÚDO DA
 * LISTA, VAI SER ONDE FORMOS USAR
 * O COMPONENTE. SERÁ DEFINIDO DE FORMA
 * DINÂMICA.
 */
type IProps<T> = FlatListProps<T> & {
  title: string;
  emptyMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function List<T>({
  title,
  emptyMessage,
  containerStyle,
  data, // da FlatListProps
  renderItem, // da FlatListProps
  ...rest
}: IProps<T>) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator color={colors.gray[200]} />}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>{emptyMessage}</Text>
        )}
        {...rest}
      />
    </View>
  );
}
