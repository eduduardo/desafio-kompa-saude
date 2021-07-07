import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from 'react-native';
import colors from '../common/colors';
import fonts from '../common/fonts';
import Button from '../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { createRecord } from '../actions/medicalRecord';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';

const MIN_HISTORY_LENGTH = 10;
const MAX_HISTORY_LENGTH = 1000;

DropDownPicker.addTranslation('pt-BR', {
  PLACEHOLDER: 'Selecione...',
  SEARCH_PLACEHOLDER: 'Procure por uma',
  SELECTED_ITEMS_COUNT_TEXT: '{count} itens selecionados',
  NOTHING_TO_SHOW: 'Não há nenhum item para ser exibido',
});
DropDownPicker.setLanguage('pt-BR');

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
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
    fontWeight: fonts.weight.semibold,
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
    minHeight: 150,
    lineHeight: 22,
    textAlignVertical: 'top',
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
    color: colors.primary,
    fontSize: 12,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: colors.primary,
    borderWidth: 1,
  },

  picker: {
    borderColor: 'transparent',
    backgroundColor: colors.lightGray,
  },
  pickerDropdown: {
    borderColor: colors.gray,
    backgroundColor: colors.lightGray,
  },

  submitButton: {
    marginTop: 15,
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
        listMode="SCROLLVIEW"
        style={[styles.picker, error && styles.errorBorder]}
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

    if (
      history.length < MIN_HISTORY_LENGTH ||
      history.length > MAX_HISTORY_LENGTH
    ) {
      setError(
        'history',
        `O histórico deve ter o mínimo de ${MIN_HISTORY_LENGTH} caracteres e máximo de ${MAX_HISTORY_LENGTH}.`,
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
  }, [
    complaintSelected,
    illnessesSelected,
    history,
    dispatch,
    setError,
    navigation,
  ]);

  useEffect(() => {
    if (complaintSelected !== null) {
      setError('complaint', null);
    }

    if (
      history.length > MIN_HISTORY_LENGTH &&
      history.length < MAX_HISTORY_LENGTH
    ) {
      setError('history', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complaintSelected, history]);

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

          <>
            <Text style={styles.label}>Histórico da Moléstia</Text>
            <TextInput
              placeholder="Digite..."
              placeholderTextColor={colors.gray}
              numberOfLines={5}
              maxLength={MAX_HISTORY_LENGTH}
              multiline
              style={[styles.textarea, errors.history && styles.errorBorder]}
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
              value={history}
              onChangeText={value => setHistory(value)}
            />
            {errors.history && (
              <Text style={styles.error}>{errors.history}</Text>
            )}
          </>

          <Button
            content={!loading && 'Salvar'}
            onPress={() => handleSubmit()}
            style={styles.submitButton}>
            {loading && <ActivityIndicator color={colors.white} />}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewMedicalRecord;
