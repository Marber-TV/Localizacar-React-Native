import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Modal, Button, VStack, Icon } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const Ubi = ({ coche }) => {
    const [modalVisible, setModalVisible] = useState(false);

    // Ensure latitude and longitude are numbers
    const latitude = parseFloat(coche.latitude);
    const longitude = parseFloat(coche.longitude);

    const openMap = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.cocheItem}>
                <Icon as={Ionicons} name="car-outline" size="2xl" />
                <Text style={styles.cocheText}>Matricula: {coche.matricula}</Text>
            </TouchableOpacity>

            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} size="full">
                <Modal.Content width="100%" height="100%">
                    <Modal.CloseButton />
                    <Modal.Header>Ubicación del Coche</Modal.Header>
                    <Modal.Body>
                        <VStack space={5} mt={5}>
                            {!isNaN(latitude) && !isNaN(longitude) ? (
                                <MapView
                                    style={styles.map}
                                    initialRegion={{
                                        latitude: latitude,
                                        longitude: longitude,
                                        latitudeDelta: 0.005,
                                        longitudeDelta: 0.005,
                                    }}
                                >
                                    <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
                                </MapView>
                            ) : (
                                <Text>No hay ubicación disponible para este coche</Text>
                            )}
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onPress={() => setModalVisible(false)}>Cerrar</Button>
                        <Button onPress={openMap} ml={3}>Abrir en Mapas</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginHorizontal: 10,
    },
    cocheItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    cocheText: {
        fontSize: 20,
        marginLeft: 15,
    },
    map: {
        width: '100%',
        height: 600, // Ajusta la altura del mapa
        marginVertical: 10,
    },
});

export default Ubi;
