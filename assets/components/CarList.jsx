import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert } from 'react-native';
import CarItem from './CarItem';
import { useTheme } from '../path/to/ThemeContext';

const CarList = () => {
  const { theme } = useTheme();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('https://www.localizacar.info/api/coches')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched cars:', data);
        setCars(data);
      })
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const handleDelete = (matricula) => {
    fetch(`https://www.localizacar.info/api/coches/${matricula}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setCars(cars.filter(car => car.matricula !== matricula));
          Alert.alert("Eliminación exitosa", "El coche ha sido eliminado correctamente.");
        } else {
          Alert.alert("Error", "No se pudo eliminar el coche.");
        }
      })
      .catch(error => {
        console.error('Error deleting car:', error);
        Alert.alert("Error", "No se pudo eliminar el coche.");
      });
  };

  const handleUpdate = (matricula, newBrand, newColor) => {
    fetch(`https://www.localizacar.info/api/coches/${matricula}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ marca: newBrand, color: newColor })
    })
      .then(response => response.json())
      .then(updatedCar => {
        if (updatedCar) {
          setCars(cars.map(car => car.matricula === matricula ? { ...car, marca: newBrand, color: newColor } : car));
          Alert.alert("Actualización exitosa", "El coche ha sido actualizado correctamente.");
        } else {
          Alert.alert("Error", "No se pudo actualizar el coche.");
        }
      })
      .catch(error => {
        console.error('Error updating car:', error);
        Alert.alert("Error", "No se pudo actualizar el coche.");
      });
  };

  const renderCarItem = ({ item }) => {
    console.log('Rendering item:', item);
    return (
      <CarItem
        matricula={item.matricula}
        brand={item.marca}
        color={item.color}
        onEdit={() => handleUpdate(item.matricula, 'NewBrand', 'NewColor')}
        onDelete={() => handleDelete(item.matricula)}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={cars}
        renderItem={renderCarItem}
        keyExtractor={item => item.matricula}
      />
    </View>
  );
};

export default CarList;
