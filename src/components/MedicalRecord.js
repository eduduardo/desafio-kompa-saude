/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../common/colors';
import fonts from '../common/fonts';

import Feather from 'react-native-vector-icons/Feather';

export const CARD_HEIGHT = 320;

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

const formatHour = number => (number < 10 ? `0${number}` : number);

const monthNames = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];

const getMonthName = date => monthNames[date.getMonth()];

const MedicalRecord = ({ complaint, illnesses, history, date }) => {
  date = new Date(date);

  return (
    <View style={styles.container}>
      <View style={styles.time}>
        <Text style={[styles.timeText, { fontWeight: 'bold' }]}>
          {date.getDate()}
        </Text>
        <Text style={[styles.timeText, { fontSize: 16 }]}>
          {getMonthName(date)}
        </Text>
        <Text style={[styles.timeText, { fontSize: 12 }]}>
          {date.getFullYear()}
        </Text>
      </View>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Feather name="clock" size={28} color={colors.white} />
          <Text style={styles.titleTime}>{`${formatHour(
            date.getHours(),
          )}:${formatHour(date.getMinutes())}`}</Text>
        </View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Anamnese</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.labelText}>Queixa Principal</Text>
          <Text>{complaint.label}</Text>

          <Text style={styles.labelText}>Doenças Adulto</Text>
          <View style={styles.illnesses}>
            {illnesses.map((illness, index) => (
              <View style={styles.tag} key={index}>
                <Text>{illness.label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.labelText}>Histórico da moléstia</Text>
          <Text>{history}</Text>
        </View>
      </View>
    </View>
  );
};

export default MedicalRecord;
