import React from 'react';
import { Provider } from 'react-redux';
import { store } from './config/Store';
import MusicApp from './source/MusicApp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayerPage from './source/Player/PlayerPage';
import { Screens } from './source/services/constansts';
import PlaylistPage from './source/Playlist/PlaylistPage';

const Stack = createNativeStackNavigator<Screens>();

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} initialRouteName="Main">
          <Stack.Screen name="Main" component={MusicApp} />
          <Stack.Screen name="Player" component={PlayerPage} />
          <Stack.Screen name="Playlist" component={PlaylistPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};