import React from 'react';

import { Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const App = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    }}>
    <Text>Kompa Saude</Text>
    <Feather name="star" />
  </View>
);

export default App;
