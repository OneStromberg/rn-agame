import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';

import HomeScreen from './src/Home';

// import './src/admod';

const Stack = createNativeStackNavigator();

const MainScreen = ({ navigation }) => (
  <View>
    <TouchableOpacity onPress={() => navigation.navigate('Game')}>
      <View>
        <Text>Play</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
      <View>
        <Text>Score</Text>
      </View>
    </TouchableOpacity>
  </View>
)

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{
            title: 'Home'
          }}
        />
        <Stack.Screen
          name="Game"
          component={HomeScreen}
          options={{
            headerTransparent: true,
            title: null
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
