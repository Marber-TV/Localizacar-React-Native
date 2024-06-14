import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import stylesLandingPage from '../styles/stylesLandingPage.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LandingPage = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const checkSession = async () => {
        try {
          const session = await AsyncStorage.getItem('session');
          console.log('Session retrieved:', session); // Debug message
          if (session === 'true') {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (e) {
          console.error('Error checking session:', e);
        }
      };
      checkSession();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../src/login3.jpeg')}
      style={stylesLandingPage.backgroundImage}
    >
      <Text style={[stylesLandingPage.title, stylesLandingPage.longShadow]}>LocalizaCar</Text>
      
      <View style={stylesLandingPage.buttonContainer}>
        <View style={stylesLandingPage.button}>
          <Button
            color="#000000"
            title={isLoggedIn ? "Entrar" : "Iniciar Sesión"}
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
        {!isLoggedIn && (
          <View style={stylesLandingPage.button}>
            <Button
              color="#000000"
              title="Registrarse"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        )}
      </View>
      <Text style={[stylesLandingPage.subtitle, stylesLandingPage.longShadow]}>La solución para nunca olvidar dónde aparcaste</Text>
    </ImageBackground>
  );
};

export default LandingPage;
