import { StyleSheet } from 'react-native';

const stylesSignIn = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  headerText: {
    fontSize: 34,
    color: '#000000',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    padding: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  signUpLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  signUpText: {
    color: '#000000',
    textDecorationLine: 'underline',
  },
});

export default stylesSignIn;
