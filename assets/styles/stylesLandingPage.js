import { StyleSheet } from 'react-native';

const stylesLandingPage = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: 'black', 
    fontSize: 45,
    marginTop: '30%', // Changed to percentage
    fontWeight: 'bold',
    letterSpacing: -1,
    textAlign: 'center',
    marginBottom: '85%', // Changed to percentage
    textShadowColor: 'rgba(0, 0, 0, 2)', // White shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    color: 'black', 
    fontSize: 20,
    textAlign: 'center',
    marginBottom: '3%', // Changed to percentage
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 2)', // Shadow color
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    textShadowOffset: { width: 0.5, height: 0.5 }, // Long shadow
    textShadowRadius: 5,
    textShadowColor: 'rgba(150, 150, 150, 2)',
  },
  buttonContainer: {
    width: 'auto',
    justifyContent: 'center',
    marginBottom: '50%', // Changed to percentage
  },
  button: {
    marginVertical: 10,
  },
});

export default stylesLandingPage;
