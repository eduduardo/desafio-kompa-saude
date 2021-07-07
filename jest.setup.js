/* eslint-disable no-undef */
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/stack', () => ({
  ...jest.requireActual('@react-navigation/stack'),
}));

beforeEach(() => {
  useNavigation.mockReset();
});

afterEach(() => {
  jest.clearAllMocks();
});
