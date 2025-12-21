import { StyleSheet } from 'react-native';

import { colors, fontFamily } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',

    paddingTop: 32,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 32,
  },

  title: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.black,

    marginBottom: 7,
  },

  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.gray[500],
  },
});
