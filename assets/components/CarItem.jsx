import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CarItem = ({ matricula, brand, color, onEdit, onDelete }) => {
  console.log('CarItem props:', { matricula, brand, color, onEdit, onDelete });

  return (
    <View style={styles.container}>
      <Ionicons name="car-outline" size={32} style={styles.carIcon} />
      <View style={styles.details}>
        <Text style={styles.matricula}>Matricula: {matricula}</Text>
        <Text style={styles.brand}>Marca: {brand}</Text>
        <Text style={styles.color}>Color: {color}</Text>
      </View>
      <TouchableOpacity onPress={onEdit} style={styles.button}>
        <Ionicons name="pencil" size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.button}>
        <Ionicons name="trash" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  carIcon: {
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  matricula: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 20,
  },
  color: {
    fontSize: 18,
    color: '#666',
  },
  button: {
    marginHorizontal: 15,
  },
});

export default CarItem;
