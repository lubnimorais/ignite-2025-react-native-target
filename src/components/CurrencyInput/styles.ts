import { StyleSheet } from 'react-native';

import { colors, fontFamily } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },

  label: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.gray[500],
  },

  input: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    color: colors.black,

    paddingBottom: 12,

    borderBottomWidth: 1,
    borderBottomColor: colors.gray[400],
  },
});
