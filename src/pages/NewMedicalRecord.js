import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import colors from '../common/colors';
import fonts from '../common/fonts';
import Button from '../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { createRecord } from '../actions/medicalRecord';
//import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';

DropDownPicker.addTranslation('pt-BR', {
  PLACEHOLDER: 'Selecione...',
  SEARCH_PLACEHOLDER: 'Procure por uma',
  SELECTED_ITEMS_COUNT_TEXT: '{count} itens selecionados',
  NOTHING_TO_SHOW: 'Não há nenhum item para ser exibido',
});
DropDownPicker.setLanguage('pt-BR');

const styles = StyleSheet.create({
  container: {},
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 10,
    marginTop: 20,
  },
  titleContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    color: colors.secondaryDark2,
    fontSize: fonts.size.medium,
  },
  cardBody: {
    padding: 10,
  },
  label: {
    fontWeight: '600',
    fontSize: fonts.size.small,
    marginTop: 10,
    marginBottom: 10,
  },

  textarea: {
    fontSize: fonts.size.medium,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: colors.lightGray,
    minHeight: 100,
  },

  illnesses: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tag: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: colors.secondary,
    marginRight: 10,
    marginVertical: 5,
    flexDirection: 'row',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },

  picker: {
    borderColor: 'transparent',
    backgroundColor: colors.lightGray,
  },
  pickerDropdown: {
    borderColor: colors.gray,
    backgroundColor: colors.lightGray,
  },
});

const FieldInput = ({
  title,
  value,
  items,
  setValue,
  multiple,
  zIndex = 1,
  error,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Text style={styles.label}>{title}</Text>
      <DropDownPicker
        open={open}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        zIndex={zIndex}
        multiple={multiple}
        style={styles.picker}
        dropDownContainerStyle={styles.pickerDropdown}
        items={items.map(item => ({ ...item, value: item.id }))}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

const useError = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const setMessage = (errorKey, errorMessage) => {
    setState(prevState => ({
      ...prevState,
      [errorKey]: errorMessage,
    }));
  };

  return [state, setMessage];
};

const NewMedicalRecord = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { complaints, illnesses } = useSelector(state => state.medicalInfos);

  const [complaintSelected, setComplaint] = useState(null);
  const [illnessesSelected, setIllnesses] = useState([]);

  const [errors, setError] = useError({
    complaint: null,
    history: null,
  });

  const [history, setHistory] = useState('');

  const dispatch = useDispatch();

  const handleRemoveIllness = index => {
    setIllnesses(
      illnessesSelected.filter(illnessesIndex => illnessesIndex !== index),
    );
  };

  const handleSubmit = useCallback(() => {
    if (complaintSelected === null) {
      setError('complaint', 'Qual seria sua queixa principal?');
    } else {
      setError('complaint', null);
    }

    if (history.length < 10 || history.length > 1000) {
      setError(
        'history',
        'O histórico deve ter o mínimo de 10 caracteres e máximo de 1000.',
      );
    } else {
      setError('history', null);
    }

    if (complaintSelected == null || history.length <= 0) {
      return;
    }

    setLoading(true);
    dispatch(
      createRecord({
        complaint: complaintSelected,
        illnesses: illnessesSelected,
        history,
      }),
    )
      .then(() => {
        navigation.goBack();
        Toast.show('Novo prontuário adicionado!');
      })
      .catch(() => {
        Alert.alert(
          'Erro ao enviar prontuário',
          'Ops... não foi possível enviar o prontutário, tente novamente.',
        );
      })
      .finally(() => setLoading(false));
  }, [dispatch, complaintSelected, illnessesSelected, history]);

  return (
    <ScrollView>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Anamnese</Text>
        </View>
        <View style={styles.cardBody}>
          <FieldInput
            title="Queixa principal"
            zIndex={3}
            value={complaintSelected}
            setValue={setComplaint}
            items={complaints}
            error={errors.complaint}
          />
          <FieldInput
            title="Doenças Adulto"
            zIndex={2}
            value={illnessesSelected}
            setValue={setIllnesses}
            items={illnesses}
            multiple
            error={errors.illnesses}
          />

          {illnessesSelected.length > 0 && (
            <>
              <Text style={styles.label}>Selecionados:</Text>
              <View style={styles.illnesses}>
                {illnessesSelected.map(index => (
                  <TouchableOpacity
                    style={styles.tag}
                    onPress={() => handleRemoveIllness(index)}>
                    <Text>{illnesses[index - 1].label}</Text>
                    <Feather name="x" size={18} />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <View>
            <Text style={styles.label}>Histórico da Moléstia</Text>
            <TextInput
              placeholder="Digite..."
              placeholderTextColor={colors.gray}
              numberOfLines={5}
              multiline
              style={styles.textarea}
              value={history}
              onChangeText={value => setHistory(value)}
            />
            {errors.history && (
              <Text style={styles.error}>{errors.history}</Text>
            )}
          </View>

          <Button
            content={!loading && 'Salvar'}
            onPress={() => handleSubmit()}
            style={{ marginTop: 15 }}>
            {loading && <ActivityIndicator color={colors.white} />}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewMedicalRecord;
