/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../common/colors';
import fonts from '../common/fonts';

import Feather from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  time: {
    alignItems: 'center',
    textAlign: 'center',
    marginRight: 10,
  },
  timeText: {
    color: colors.secondaryDark2,
    fontSize: 18,
    lineHeight: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  titleContainer: {
    backgroundColor: colors.secondaryDark,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTime: {
    color: colors.white,
    fontSize: fonts.size.medium,
    marginLeft: 10,
  },
  subTitleContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  subTitle: {
    color: colors.secondaryDark2,
    fontSize: fonts.size.medium,
    fontWeight: '600',
  },

  cardBody: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginTop: 10,
    marginBottom: 5,
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
  },
});

const MedicalRecord = () => {
  const illnesses = [{ text: 'diabetes' }, { text: 'aaa' }];
  return (
    <View style={styles.container}>
      <View style={styles.time}>
        <Text style={[styles.timeText, { fontWeight: 'bold' }]}>24</Text>
        <Text style={[styles.timeText, { fontSize: 16 }]}>AGO</Text>
        <Text style={[styles.timeText, { fontSize: 12 }]}>2020</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Feather name="clock" size={28} color={colors.white} />
          <Text style={styles.titleTime}>18:41</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Anamnese</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.labelText}>Queixa Principal</Text>
          <Text>Vomito</Text>

          <Text style={styles.labelText}>Doenças Adulto</Text>
          <View style={styles.illnesses}>
            {illnesses.map(illness => (
              <View style={styles.tag}>
                <Text>{illness.text}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.labelText}>Histórico da moléstia</Text>
          <Text>Fortes dores de cabeça há uma semana.</Text>
        </View>
      </View>
    </View>
  );
};

export default MedicalRecord;
