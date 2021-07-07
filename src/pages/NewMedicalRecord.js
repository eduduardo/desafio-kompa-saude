import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import colors from '../common/colors';
import fonts from '../common/fonts';
import Button from '../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';

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
    marginBottom: 20,
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
    flexDirection: 'row'
  },
});

const FieldInput = ({zIndex = 1}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]);

  return (
    <>
      <Text style={styles.label}>Queixa principal</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Selecione..."
        zIndex={zIndex}
        style={{
          borderColor: 'transparent',
          backgroundColor: colors.lightGray,
        }}
        dropDownContainerStyle={{
          borderColor: colors.gray,
          backgroundColor: colors.lightGray,
        }}
      />
    </>
  );
};

const NewMedicalRecord = () => {
  const illnesses = [{ text: 'diabetes' }, { text: 'aaa' }];
  return (
    <ScrollView>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Anamnese</Text>
        </View>
        <View style={styles.cardBody}>
          <FieldInput zIndex={3} />
          <FieldInput zIndex={2} />

          <Text style={styles.label}>Selecionados:</Text>
          <View style={styles.illnesses}>
            {illnesses.map(illness => (
              <TouchableOpacity style={styles.tag}>
                <Text>{illness.text}</Text>
                <Feather name='x' size={18} />
              </TouchableOpacity>
            ))}
          </View>

          <View>
            <Text style={styles.label}>Histórico da Moléstia</Text>
            <TextInput
              placeholder="Digite..."
              placeholderTextColor={colors.gray}
              numberOfLines={5}
              multiline
              style={styles.textarea}
            />
          </View>

          <Button content="Salvar" />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewMedicalRecord;
