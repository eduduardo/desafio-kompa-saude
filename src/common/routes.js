import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '../pages/HomePage';
import colors from './colors';

const Stack = createStackNavigator();

const commonScenes = {
  HomePage: {
    component: HomePage,
    options: {
      title: 'Prontuário eletrônico',
    },
  },
};

const SCREEN_OPTIONS = {
  headerTitleStyle: { alignSelf: 'flex-start' },
  headerTintColor: colors.black,
  headerBackTitleVisible: false,
};

const Routes = () => {
  return (
    <Stack.Navigator screenOptions={SCREEN_OPTIONS}>
      {Object.entries({
        ...commonScenes,
      }).map(([name, route]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={route.component}
          options={route.options}
        />
      ))}
    </Stack.Navigator>
  );
};
export default Routes;
