import { NavigationContainer} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ResumeFromScreen from './components/ResumeForm.js';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function homeScreen(){
  return (
  <View style={styles.container}>
    <Button>xxxxxxxxxxx</Button>
  </View>
  )
} 


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "resumeFrom" options={{title: "Resume From"}} component={ResumeFromScreen}></Stack.Screen>
        <Stack.Screen name = "homeScreen" component={homeScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
