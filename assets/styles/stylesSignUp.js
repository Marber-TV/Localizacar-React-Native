import { StyleSheet, Platform } from 'react-native';

const stylesSignUp = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff', // Fondo blanco
  },
  headerText: {
    fontSize: 32,
    color: '#000000', // Texto negro
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#000000', // Borde negro
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#000000', // Texto negro
    backgroundColor: '#ffffff', // Fondo blanco
  },
  inputWeb: {
    width: '50%', 
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#000000', // Botón negro
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff', // Texto blanco
    fontSize: 18,
  },
  linkButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#000000', // Enlace en texto negro
    fontSize: 16,
    textDecorationLine: 'underline', // Subrayado para indicar que es un enlace
  },
});

export default stylesSignUp;
