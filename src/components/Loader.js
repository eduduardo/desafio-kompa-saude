import React, { useLayoutEffect } from 'react';

import { StyleSheet, Animated, Easing } from 'react-native';
import kompa from '../../assets/kompa-icon.png';

const LOADER_SIZE = 80;

const styles = StyleSheet.create({
  pokeball: {
    width: LOADER_SIZE,
    height: LOADER_SIZE,
    marginVertical: 10,
    alignSelf: 'center',
  },
});

const Loader = () => {
  const spinAnimationValue = new Animated.Value(0);

  useLayoutEffect(() => {
    Animated.loop(
      Animated.timing(spinAnimationValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bezier(0.645, 0.045, 0.355, 1.0),
        useNativeDriver: true,
        isInteraction: false,
      }),
    ).start();
  }, []);

  const spinAnimationRotate = spinAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Image
      source={kompa}
      style={{
        transform: [{ rotate: spinAnimationRotate }],
        ...styles.pokeball,
      }}
    />
  );
};

export default Loader;
