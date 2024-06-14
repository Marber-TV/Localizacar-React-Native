import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NativeBaseProvider } from 'native-base';
import SignIn from './assets/pages/SignIn';
import SignUp from './assets/pages/SignUp';
import LandingPage from './assets/pages/LandingPage';
import Main from './assets/pages/Main';
import Car from './assets/pages/Car';
import Parking from './assets/pages/Parking';
import LogoutConfirmation from './assets/pages/LogoutConfirmation';
import Groups from './assets/pages/Groups';
import Chat from './assets/pages/Chat';
import Settings from './assets/pages/Settings';
import 'react-native-gesture-handler';
import { ThemeProvider } from './assets/components/ThemeContext'; 

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          props.navigation.navigate('LogoutConfirmation', { setIsAuthenticated: props.setIsAuthenticated });
        }}
      >
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function GroupsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Groups">
      <Stack.Screen name="Groups" component={Groups} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function DrawerNavigator({ setIsAuthenticated }) {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => <CustomDrawerContent {...props} setIsAuthenticated={setIsAuthenticated} />}
    >
      <Drawer.Screen name="Inicio" component={Main} />
      <Drawer.Screen name="Aparcamiento" component={Parking} />
      <Drawer.Screen name="Coche" component={Car} />
      <Drawer.Screen name="Grupos" component={GroupsStackNavigator} />
      <Drawer.Screen name="Ajustes Experimentales" component={Settings} />
      <Drawer.Screen name="LogoutConfirmation" component={LogoutConfirmation} options={{ drawerLabel: () => null }} />
    </Drawer.Navigator>
  );
}

function AuthStackNavigator({ onSuccessfulSignIn }) {
  return (
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn">
        {props => <SignIn {...props} onSuccessfulSignIn={onSuccessfulSignIn} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSuccessfulSignIn = () => {
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          {isAuthenticated ? (
            <DrawerNavigator setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <AuthStackNavigator onSuccessfulSignIn={handleSuccessfulSignIn} />
          )}
        </NavigationContainer>
      </NativeBaseProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: 'red',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  logoutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;
