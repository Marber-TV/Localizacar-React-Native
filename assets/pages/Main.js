import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Fab, Icon, Modal, Button, VStack, Select, NativeBaseProvider } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createParking, fetchUserCoches, fetchGroupCoches } from '../services/parkingService';
import CarItem from '../components/CarItem';

function Main() {
  const [region, setRegion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCoche, setSelectedCoche] = useState('');
  const [userCoches, setUserCoches] = useState([]);
  const [groupCoches, setGroupCoches] = useState([]);
  const [usermail, setUsermail] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    const fetchUserEmailAndCoches = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (email) {
          setUsermail(email);
          const userCochesData = await fetchUserCoches(email);
          setUserCoches(userCochesData || []);
          const groupCochesData = await fetchGroupCoches(email);
          setGroupCoches(groupCochesData || []);
        }
      } catch (error) {
        console.error('Error fetching coches:', error);
      }
    };

    fetchLocation();
    fetchUserEmailAndCoches();
    const interval = setInterval(() => {
      fetchUserEmailAndCoches();
      fetchLocation();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleParking = async () => {
    try {
      if (!usermail) throw new Error('No user email found.');
      if (!region) throw new Error('No region defined.');

      const parkingData = {
        latitude: region.latitude,
        longitude: region.longitude,
        usermail,
        matricula: selectedCoche,
      };

      const data = await createParking(parkingData);
      alert(data.message || 'Ubicación guardada exitosamente.');
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Failed to send location data.');
    }
    setShowModal(false);
  };

  const allCoches = [...userCoches, ...groupCoches];

  // Eliminar duplicados por matrícula
  const uniqueCoches = Array.from(new Set(allCoches.map(coche => coche.matricula)))
    .map(matricula => allCoches.find(coche => coche.matricula === matricula));

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        {region && (
          <MapView style={styles.map} initialRegion={region}>
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          </MapView>
        )}
        <Fab
          position="absolute"
          size="sm"
          icon={<Icon as={Ionicons} name="location-outline" />}
          onPress={() => setShowModal(true)}
        />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Confirmar Estacionamiento</Modal.Header>
            <Modal.Body>
              <VStack space={4}>
                <Select
                  selectedValue={selectedCoche}
                  minWidth="200"
                  accessibilityLabel="Elige un coche"
                  placeholder="Elige un coche"
                  _selectedItem={{
                    bg: "#f0f8ff",
                    endIcon: <Icon as={Ionicons} name="arrow-back" size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setSelectedCoche(itemValue)}
                >
                  {uniqueCoches.map((coche) => (
                    <Select.Item key={coche.matricula} label={`${coche.marca}: ${coche.matricula}`} value={coche.matricula} />
                  ))}
                </Select>
                <Button onPress={handleParking} isDisabled={!selectedCoche}>Confirmar</Button>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Main;
