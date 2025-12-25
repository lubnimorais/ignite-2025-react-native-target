import { StyleSheet } from 'react-native';

import { colors, fontFamily } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,

    paddingVertical: 16,
  },

  info: {
    flex: 1,
    gap: 7,
  },

  value: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.black,
  },

  description: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.gray[500],
  },
});
