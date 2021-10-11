import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TouchableOpacity, View } from 'react-native';

import HomeScreen from './src/Home';

import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-4252623491838002~3261772449';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const Stack = createNativeStackNavigator();

const AdsTest = () => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <Button
      title="Show Interstitial"
      onPress={() => {
        interstitial.show();
      }}
    />
  );
}

const MainScreen = ({ navigation }) => (
  <View>
    <TouchableOpacity onPress={() => navigation.navigate('Game')}>
      <View>
        <Text>Play</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => { }}>
      <View>
        <Text>Score</Text>
      </View>
    </TouchableOpacity>
    <AdsTest />
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
