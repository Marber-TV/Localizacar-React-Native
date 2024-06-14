import { StyleSheet } from 'react-native';

const stylesCar = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'black', // Considera usar el tema aquí también si lo prefieres
  },
  addButtonText: {
    color: 'white',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Considera usar el tema aquí también si lo prefieres
  },
});

export default stylesCar;
