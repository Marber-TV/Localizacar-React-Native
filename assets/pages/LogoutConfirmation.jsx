import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import stylesLogoutConfirmation from '../styles/stylesLogoutConfirmation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutConfirmation = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { setIsAuthenticated } = route.params;

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.setItem('session', 'false'); // Set session to false
      setIsAuthenticated(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'LandingPage' }],
      });
    } catch (e) {
      console.error('Error during logout:', e);
    }
  };

  return (
    <View style={[stylesLogoutConfirmation.container, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
      <Ionicons name="sad-outline" size={100} style={[stylesLogoutConfirmation.icon, { color: theme === 'dark' ? '#fff' : '#000' }]} />
      <Text style={[stylesLogoutConfirmation.text, { color: theme === 'dark' ? '#fff' : '#000' }]}>¿Realmente quieres cerrar sesión?</Text>
      <TouchableOpacity
        style={[stylesLogoutConfirmation.button, { backgroundColor: theme === 'dark' ? '#ccc' : 'black' }]}
        onPress={handleLogout}
      >
        <Text style={[stylesLogoutConfirmation.buttonText, { color: 'red' }]}>Sí, cerrar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[stylesLogoutConfirmation.button, { backgroundColor: theme === 'dark' ? '#ccc' : 'black' }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[stylesLogoutConfirmation.buttonText, { color: theme === 'dark' ? '#000' : '#fff' }]}>No, volver atrás</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutConfirmation;
