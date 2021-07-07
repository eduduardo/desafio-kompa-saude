import React, { useState } from 'react';
import { FlatList, Text, StyleSheet, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import Loader from '../components/Loader';
import MedicalRecord from '../components/MedicalRecord';
import fonts from '../common/fonts';
import colors from '../common/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    fontSize: fonts.size.big,
    color: colors.gray,
    marginVertical: 15,
  },
});

const renderPokemonCard = ({ item, index }) => <MedicalRecord {...item} />;
const medialRecordKeyExtractor = item => `medical-${item.id}`;
const loader = <Loader />;
const CARD_HEIGHT = 100;

const emptyList = (
  <Text style={styles.empty}>Nenhum prontuário cadastrado.</Text>
);

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const medicalRecords = useSelector(
    state => state.medicalRecords.medicalRecords,
  );
  const navigation = useNavigation();

  return (
    <FlatList
      keyboardDismissMode="on-drag"
      style={styles.container}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
      getItemLayout={(data, index) => ({
        length: CARD_HEIGHT,
        offset: CARD_HEIGHT * index,
        index,
      })}
      ListEmptyComponent={loading ? loader : emptyList}
      ListFooterComponent={() => <Button content="Adicionar novo prontuário" />}
      data={medicalRecords}
      renderItem={renderPokemonCard}
      keyExtractor={medialRecordKeyExtractor}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => resetList()} />
      }
    />
  );
};

export default HomePage;
