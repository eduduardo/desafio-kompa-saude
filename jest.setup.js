/* eslint-disable no-undef */
import { useNavigation } from '@react-navigation/native';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('@react-native-community/async-storage', () => {
  return {
    getItem: async (...args) => args,
    setItem: async (...args) => args,
    removeItem: async (...args) => args,
  };
});

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-simple-toast', () => ({
  SHORT: jest.fn(),
  show: jest.fn(),
}));

jest.mock('@react-navigation/stack', () => ({
  ...jest.requireActual('@react-navigation/stack'),
}));

beforeEach(() => {
  useNavigation.mockReset();
});

afterEach(() => {
  jest.clearAllMocks();
});
