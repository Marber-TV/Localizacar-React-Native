import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Center, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import { fetchUserCoches, fetchGroupCoches, fetchParkingDataByUser } from '../services/parkingService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ubi from '../components/Ubi';

const Parking = () => {
    const [userCoches, setUserCoches] = useState([]);
    const [groupCoches, setGroupCoches] = useState([]);
    const [usermail, setUsermail] = useState('');
    const [parkingData, setParkingData] = useState([]);

    const { theme } = useTheme();

    useEffect(() => {
        const fetchUserEmail = async () => {
            const email = await AsyncStorage.getItem('userEmail');
            if (email) {
                setUsermail(email);
                await loadUserCochesAndGroupCoches(email);
                await loadParkingData(email);
            }
        };
        fetchUserEmail();
        
        const intervalId = setInterval(() => {
            if (usermail) {
                loadUserCochesAndGroupCoches(usermail);
                loadParkingData(usermail);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [usermail]);

    const loadUserCochesAndGroupCoches = async (email) => {
        try {
            const userCoches = await fetchUserCoches(email);
            setUserCoches(userCoches || []);
        } catch (error) {
            console.error('Error loading user coches:', error);
        }

        try {
            const groupCoches = await fetchGroupCoches(email);
            setGroupCoches(groupCoches || []);
        } catch (error) {
            console.error('Error loading group coches:', error);
        }
    };

    const loadParkingData = async (email) => {
        try {
            const parkings = await fetchParkingDataByUser(email);
            setParkingData(parkings || []);
        } catch (error) {
            console.error('Error loading parking data:', error);
        }
    };

    const mergeCochesWithParking = () => {
        const allCoches = [...userCoches, ...groupCoches];
        
        // Log para verificar los datos de entrada
        console.log("All Coches:", allCoches);
        console.log("Parking Data:", parkingData);
    
        // Añadir información de parkingData a allCoches antes de filtrar por ID
        const cochesConDatosDeParking = allCoches.map(coche => {
            const parking = parkingData.filter(p => p.matricula === coche.matricula);
            return parking.length > 0 ? parking : [coche];
        }).flat();
    
        // Filtrar por matrícula única con el ID más alto
        const uniqueCoches = Object.values(cochesConDatosDeParking.reduce((acc, coche) => {
            const existing = acc[coche.matricula];
            if (!existing || (coche.id && existing.id < coche.id)) {
                acc[coche.matricula] = coche;
            }
            return acc;
        }, {}));
    
        console.log("Unique Coches:", uniqueCoches);
    
        return uniqueCoches;
    };
    
    
    
    

    const allCochesWithParking = mergeCochesWithParking();

    return (
        <View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#333' }]}>
            {allCochesWithParking.length > 0 ? (
                <FlatList
                    data={allCochesWithParking}
                    renderItem={({ item }) => <Ubi coche={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Center flex={1}>
                    <Icon as={Ionicons} name="car-outline" size="lg" />
                    <Text style={{ color: theme === 'light' ? '#000' : '#fff' }}>No hay coches</Text>
                </Center>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default Parking;
