import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from "react-native-paper";
import HomeScreen from './src/screen/HomeScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from './src/store/store';
import { NavigationContainer } from "@react-navigation/native";
import MainStack from './src/navigators/stackNav';
import DashboardStack from './src/navigators/dashboardStack';
import DashboardTabs from './src/navigators/bottomNav';
import UserScreen from './src/screen/UserScreen';
import UserStack from './src/navigators/userStack';
import FormAddUser from './src/screen/FormAddUser';
import FormEditUser from './src/screen/FormEditUser';
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen
              name="Login"
              component={MainStack}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Dashboard"
              component={DashboardTabs}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="FormAddStackUser"
              component={FormAddUser}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="FormEditUserStack"
              component={FormEditUser}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="User"
              component={UserScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 38,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
