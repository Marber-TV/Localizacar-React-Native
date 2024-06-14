import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Button, Modal, Text, VStack, FormControl, Input, Center, Icon, Select } from 'native-base';
import CarItem from '../components/CarItem';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import stylesCar from '../styles/stylesCar';
import { fetchUserCoches, createCar, updateCar, deleteCar } from '../services/carService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Car = () => {
  const [cars, setCars] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [matricula, setMatricula] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [editMatricula, setEditMatricula] = useState('');
  const [editBrand, setEditBrand] = useState('');
  const [editColor, setEditColor] = useState('');
  const [usermail, setUsermail] = useState('');

  const validMatricula = (matricula) => /^[0-9]{4}[A-Za-z]{3}$/.test(matricula);

  const handleAddCarInternal = () => {
    if (!matricula || !brand || !color || !validMatricula(matricula)) {
      alert('Todos los campos son obligatorios y la matrícula debe ser válida.');
      return;
    }
    handleAddCar();
  };

  const handleEditCarInternal = () => {
    if (!editMatricula || !editBrand || !editColor) {
      alert('Todos los campos son obligatorios.');
      return;
    }
    handleEditCar();
  };

  const colorOptions = [
    'Rojo', 'Azul', 'Verde', 'Negro', 'Blanco', 'Gris', 'Amarillo', 
    'Marrón', 'Naranja', 'Púrpura', 'Rosa', 'Azul Oscuro', 'Verde Oscuro', 
    'Rojo Oscuro', 'Gris Oscuro', 'Amarillo Claro', 'Rosa Claro', 
    'Naranja Claro', 'Verde Claro', 'Azul Claro', 'Púrpura Claro', 
    'Cyan', 'Magenta', 'Turquesa', 'Lavanda', 'Beige', 'Violeta', 
    'Granate', 'Cobre', 'Bronce', 'Coral', 'Aguamarina', 'Fucsia', 
    'Ocre', 'Azul Marino', 'Verde Esmeralda'
  ];
  

  const { theme } = useTheme();

  useEffect(() => {
    const fetchUsermail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      if (email) {
        setUsermail(email);
        await loadUserCoches(email);
      }
    };
    fetchUsermail();
  }, []);

  const loadUserCoches = async (email) => {
    try {
      console.log(`Fetching coches for user ${email}`);
      const response = await fetchUserCoches(email);
      setCars(response);
    } catch (error) {
      console.error('Error fetching user coches:', error);
    }
  };

  const handleAddCar = async () => {
    if (matricula && brand && color) {
      try {
        const response = await createCar({ matricula, marca: brand, color, usermail });
        if (response) {
          setCars(prevCars => [...prevCars, { matricula, marca: brand, color }]);
          setMatricula('');
          setBrand('');
          setColor('');
          setModalVisible(false);
        } else {
          alert('Error al añadir coche: ' + (response.message || 'Algo salió mal'));
        }
      } catch (error) {
        console.error('Error al añadir coche:', error);
        alert('Error al añadir coche: ' + error.message);
      }
    } else {
      alert('Por favor, introduce la matrícula, marca y color del coche');
    }
  };

  const handleEditCar = async () => {
    if (editMatricula && editBrand && editColor) {
      try {
        const response = await updateCar(editMatricula, editBrand, editColor);
        if (response) {
          setCars(prevCars => prevCars.map(car => car.matricula === editMatricula ? { matricula: editMatricula, marca: editBrand, color: editColor } : car));
          setEditMatricula('');
          setEditBrand('');
          setEditColor('');
          setEditModalVisible(false);
        } else {
          alert('Error al editar coche: ' + (response.message || 'Algo salió mal'));
        }
      } catch (error) {
        console.error('Error al editar coche:', error);
        alert('Error al editar coche: ' + error.message);
      }
    } else {
      alert('Por favor, introduce la matrícula, marca y color del coche');
    }
  };

  const handleDeleteCar = async (matricula) => {
    try {
      const success = await deleteCar(matricula);
      if (success) {
        setCars(prevCars => prevCars.filter(car => car.matricula !== matricula));
      } else {
        alert('Error al eliminar coche');
      }
    } catch (error) {
      console.error('Error al eliminar coche:', error);
      alert('Error al eliminar coche: ' + error.message);
    }
  };

  const openEditModal = (car) => {
    setEditMatricula(car.matricula);
    setEditBrand(car.marca);
    setEditColor(car.color);
    setEditModalVisible(true);
  };

  return (
    <View style={[stylesCar.container, { backgroundColor: theme === 'light' ? '#fff' : '#333' }]}>
      {cars.length > 0 ? (
        <FlatList
          data={cars}
          renderItem={({ item }) => (
            <CarItem
              matricula={item.matricula}
              brand={item.marca}
              color={item.color}
              onEdit={() => openEditModal(item)}
              onDelete={() => handleDeleteCar(item.matricula)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Center flex={1}>
          <Icon as={Ionicons} name="car-outline" size="lg" />
          <Text color={theme === 'light' ? '#000' : '#fff'}>No hay coches</Text>
        </Center>
      )}
      <Button
        onPress={() => setModalVisible(true)}
        style={stylesCar.fab}
        startIcon={<Icon as={Ionicons} name="add" />}
      />
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} size="full">
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Añadir Coche</Modal.Header>
          <Modal.Body>
            <VStack space={5} mt={5}>
              <FormControl>
                <FormControl.Label>Matrícula</FormControl.Label>
                <Input
                  value={matricula}
                  onChangeText={setMatricula}
                  placeholder="Matrícula (4 numeros 3 letras mayusculas)"
                  placeholderTextColor={theme === 'light' ? '#666' : '#ccc'}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Marca</FormControl.Label>
                <Input
                  value={brand}
                  onChangeText={setBrand}
                  placeholder="Marca"
                  placeholderTextColor={theme === 'light' ? '#666' : '#ccc'}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Color</FormControl.Label>
                <Select
                  selectedValue={color}
                  onValueChange={(itemValue) => setColor(itemValue)}
                  placeholder="Seleccione un color"
                  placeholderTextColor={theme === 'light' ? '#666' : '#ccc'}
                >
                  {colorOptions.map((col) => (
                    <Select.Item label={col} value={col} key={col} />
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={handleAddCarInternal} style={stylesCar.addButton}>
              <Text style={stylesCar.addButtonText}>Añadir Coche</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={editModalVisible} onClose={() => setEditModalVisible(false)} size="full">
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Editar Coche</Modal.Header>
          <Modal.Body>
            <VStack space={5} mt={5}>
              <FormControl>
                <FormControl.Label>Matrícula</FormControl.Label>
                <Input
                  value={editMatricula}
                  isDisabled
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Marca</FormControl.Label>
                <Input
                  value={editBrand}
                  onChangeText={setEditBrand}
                  placeholder="Marca"
                  placeholderTextColor={theme === 'light' ? '#666' : '#ccc'}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Color</FormControl.Label>
                <Select
                  selectedValue={editColor}
                  onValueChange={(itemValue) => setEditColor(itemValue)}
                  placeholder="Seleccione un color"
                  placeholderTextColor={theme === 'light' ? '#666' : '#ccc'}
                >
                  {colorOptions.map((col) => (
                    <Select.Item label={col} value={col} key={col} />
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={handleEditCarInternal} style={stylesCar.addButton}>
              <Text style={stylesCar.addButtonText}>Guardar Cambios</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default Car;
