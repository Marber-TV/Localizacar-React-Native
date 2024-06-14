import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesSignIn from '../styles/stylesSignIn';

const SignIn = ({ navigation, onSuccessfulSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await AsyncStorage.getItem('session');
        if (session === 'true') {
          onSuccessfulSignIn();
        }
      } catch (e) {
        console.error('Error checking session:', e);
      }
    };
    checkSession();
  }, []);

  const storeSessionData = async (email) => {
    try {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('session', 'true');
    } catch (e) {
      console.error('Error saving session data:', e);
    }
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const onSignIn = async () => {
    if (!email || !validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Password cannot be empty.");
      return;
    }

    try {
      const response = await fetch('https://www.localizacar.info/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usermail: email,
          userpassword: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.message);

      await storeSessionData(email);
      onSuccessfulSignIn();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to sign in. Please try again.");
    }
  };

  return (
    <View style={stylesSignIn.container}>
      <Text style={stylesSignIn.headerText}>Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={stylesSignIn.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={stylesSignIn.input}
      />
      <TouchableOpacity onPress={onSignIn} style={stylesSignIn.button}>
        <Text style={stylesSignIn.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={stylesSignIn.signUpLink}>
        <Text style={stylesSignIn.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
