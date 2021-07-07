import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import Loader from '../components/Loader';
import MedicalRecord, { CARD_HEIGHT } from '../components/MedicalRecord';
import fonts from '../common/fonts';
import colors from '../common/colors';
import { getComplaints, getIllnesses, testAPI } from '../actions/medicalInfos';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { API_URL } from '../common/request';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  empty: {
    fontSize: fonts.size.big,
    color: colors.gray,
    marginVertical: 15,
  },
});

const renderMedicalRecord = ({ item }) => <MedicalRecord {...item} />;
const medialRecordKeyExtractor = item => `medical-${item.id}`;

const loader = <Loader />;

const emptyList = (
  <Text style={styles.empty}>Nenhum prontuário cadastrado.</Text>
);

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.isInternetReachable !== true) {
      Toast.show('Ops.. você está sem conexão');
    }
    testAPI().catch(() =>
      Toast.show('O serviço está indisponível. Tente novamente mais tarde'),
    );
  }, [netInfo]);

  useEffect(() => {
    dispatch(getIllnesses());
    dispatch(getComplaints());

    // fake loading for the awesome loading animation appear ;)
    // ignoring this on jest
    if (process.env.JEST_WORKER_ID === undefined) {
      setTimeout(() => setLoading(false), 2000);
    } else {
      setLoading(false);
    }
  }, []);

  const medicalRecords = useSelector(
    state => state.medicalRecords.medicalRecords,
  );

  const newRecordButton = (
    <Button
      content="Adicionar novo prontuário"
      onPress={() => handleCreateNewRecord()}
    />
  );

  const handleCreateNewRecord = () => {
    navigation.navigate('NewMedicalRecord');
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={medicalRecords}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={loading && loader}
      ListEmptyComponent={!loading && emptyList}
      ListFooterComponent={newRecordButton}
      renderItem={renderMedicalRecord}
      keyExtractor={medialRecordKeyExtractor}
      getItemLayout={(data, index) => ({
        length: CARD_HEIGHT,
        offset: CARD_HEIGHT * index,
        index,
      })}
    />
  );
};

export default HomePage;
