import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Platform, Alert } from 'react-native';
import stylesSignUp from '../styles/stylesSignUp';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const onSignUp = async (email, password, confirmPassword) => {
    if (!email || !validateEmail(email)) {
      Alert.alert("Error", "Por favor ingrese un correo electrónico válido.");
      return;
    }

    if (!password || !confirmPassword) {
      Alert.alert("Error", "La contraseña no puede estar vacía.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const checkEmailResponse = await fetch(`https://www.localizacar.info/api/user/email/${email}`);
      if (checkEmailResponse.ok) {
        const emailResult = await checkEmailResponse.json();
        if (emailResult.user || emailResult.exists) {
          Alert.alert("Error", "El correo electrónico ya está en uso.");
          return;
        }
      }

      const createUserResponse = await fetch('https://www.localizacar.info/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usermail: email,
          userpassword: password,
        }),
      });

      if (!createUserResponse.ok) {
        throw new Error('Falló el registro');
      }

      Alert.alert("Éxito", "Registro exitoso. Por favor, inicie sesión.");
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Error durante el registro. Por favor, intenta de nuevo.");
    }
  };

  return (
    <View style={stylesSignUp.container}>
      <Text style={stylesSignUp.headerText}>Crear Cuenta</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[stylesSignUp.input, Platform.OS === 'web' ? stylesSignUp.inputWeb : null]}
      />
      <TextInput
        placeholder="Contraseña (8 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={[stylesSignUp.input, Platform.OS === 'web' ? stylesSignUp.inputWeb : null]}
      />
      <TextInput
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        style={[stylesSignUp.input, Platform.OS === 'web' ? stylesSignUp.inputWeb : null]}
      />
      <TouchableOpacity
        onPress={() => onSignUp(email, password, confirmPassword)}
        style={[stylesSignUp.button, Platform.OS === 'web' ? stylesSignUp.buttonWeb : null]}
      >
        <Text style={stylesSignUp.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={[stylesSignUp.linkButton, Platform.OS === 'web' ? stylesSignUp.linkButtonWeb : null]}>
        <Text style={stylesSignUp.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
