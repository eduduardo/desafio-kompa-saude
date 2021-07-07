import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import medicalRecords from '../reducers/medicalRecords';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const records = useSelector(state => state.medicalRecords.medicalRecords);
  const navigation = useNavigation();
  
  return (
    <View>
      <Text>HomePage</Text>
    </View>
  );
};

export default HomePage;
