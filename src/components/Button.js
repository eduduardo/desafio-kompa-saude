import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: 15,
    textAlign: 'center',
    borderRadius: 3,
  },
  contentText: {
    color: colors.white,
    fontSize: 18,
  },
});

const Button = ({ content, children, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
    {typeof content === 'string' ? (
      <Text style={styles.contentText}>{content}</Text>
    ) : (
      children
    )}
  </TouchableOpacity>
);

export default Button;
