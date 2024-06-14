import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GroupItem from '../components/GroupItem';
import GroupList from '../components/GroupList';
import { Center, Text, Icon, NativeBaseProvider, Button, Modal, VStack, Select, CheckIcon, FormControl, WarningOutlineIcon } from 'native-base';
import { useTheme } from '../components/ThemeContext';
import stylesGroups from '../styles/stylesGroups';
import { fetchGroups, createGroup, addUserToGroup, fetchUserCoches, removeUserFromGroup } from '../services/groupService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Groups = ({ navigation }) => {
    const [groups, setGroups] = useState([]);
    const [emailInput, setEmailInput] = useState('');
    const [usermail, setUsermail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const [addUserModalVisible, setAddUserModalVisible] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [selectedCoche, setSelectedCoche] = useState('');
    const [userCoches, setUserCoches] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const { theme } = useTheme();

    useEffect(() => {
        const fetchUserEmail = async () => {
            const email = await AsyncStorage.getItem('userEmail');
            if (email) {
                setUsermail(email);
                await loadGroups(email);
            } else {
                setIsLoading(false);
            }
        };
        fetchUserEmail();
    }, []);

    const loadGroups = async (email) => {
        setIsLoading(true);
        try {
            const data = await fetchGroups(email);
            console.log('Groups loaded:', data);
            setGroups(data);
        } catch (error) {
            console.error('Error loading groups:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLeaveGroup = async (groupId) => {
        console.log('Leaving group with ID:', groupId, 'and usermail:', usermail);
        await removeUserFromGroup(groupId, usermail);
        loadGroups(usermail);
    };

    const loadUserCoches = async (email) => {
        try {
            const coches = await fetchUserCoches(email);
            setUserCoches(coches || []);
        } catch (error) {
            console.error('Error loading user coches:', error);
        }
    };

    const handleCreateGroup = async () => {
        if (!groupName) {
            alert('El nombre del grupo es obligatorio');
            return;
        }

        console.log('Creating group with name:', groupName, 'description:', groupDescription, 'and coche:', selectedCoche);
        const group = await createGroup({ nombre: groupName, descripcion: groupDescription, coche: selectedCoche, usermail });

        if (group && group.id) {
            await addUserToGroup(group.id, usermail);
        }

        setGroupName('');
        setGroupDescription('');
        setSelectedCoche('');
        setModalVisible(false);
        loadGroups(usermail);
    };

    const handleAddUser = async () => {
        if (!emailInput) {
            alert('El correo electrónico es obligatorio');
            return;
        }

        setAddUserModalVisible(true);
    };

    const handleConfirmAddUser = async () => {
        console.log('Adding user with email:', emailInput, 'to group:', selectedGroupId);
        await addUserToGroup(selectedGroupId, emailInput);
        setAddUserModalVisible(false);
        setEmailInput('');
        loadGroups(usermail);
    };

    const handleGroupPress = (group) => {
        navigation.navigate('Chat', { groupId: group.id, usermail });
    };

    if (isLoading) {
        return (
            <NativeBaseProvider>
                <Center flex={1}>
                    <Text>Loading...</Text>
                </Center>
            </NativeBaseProvider>
        );
    }

    return (
        <NativeBaseProvider>
            <View style={[stylesGroups.container, { backgroundColor: theme === 'light' ? '#fff' : '#333' }]}>
                <View style={stylesGroups.joinGroupContainer}>
                    <TextInput
                        placeholder="Correo Electrónico"
                        value={emailInput}
                        onChangeText={setEmailInput}
                        style={[stylesGroups.input, {
                            backgroundColor: theme === 'light' ? '#fff' : '#555',
                            color: theme === 'light' ? '#000' : '#ddd',
                            borderColor: theme === 'light' ? '#ccc' : '#888'
                        }]}
                    />
                    <TouchableOpacity onPress={handleAddUser} style={stylesGroups.joinButton}>
                        <Text style={stylesGroups.joinButtonText}>Añadir</Text>
                    </TouchableOpacity>
                </View>
                {groups.length > 0 ? (
                    <GroupList
                        groups={groups}
                        onLeaveGroup={handleLeaveGroup}
                        onGroupPress={handleGroupPress}
                    />
                ) : (
                    <Center flex={1}>
                        <Icon as={MaterialCommunityIcons} name="magnify" size={24} color={theme === 'light' ? '#000' : '#fff'} />
                        <Text color={theme === 'light' ? '#000' : '#fff'}>No hay grupos</Text>
                    </Center>
                )}
                <FAB
                    style={stylesGroups.fab}
                    icon={() => <MaterialCommunityIcons name="account-group" size={24} color="white" />}
                    onPress={() => {
                        setModalVisible(true);
                        loadUserCoches(usermail);
                    }}
                />
                <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Crear Nuevo Grupo</Modal.Header>
                        <Modal.Body>
                            <VStack space={4}>
                                <FormControl isRequired>
                                    <FormControl.Label>Nombre del Grupo</FormControl.Label>
                                    <TextInput
                                        placeholder="Nombre del Grupo"
                                        value={groupName}
                                        onChangeText={setGroupName}
                                        style={styles.modalInput}
                                    />
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        Nombre es requerido.
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <FormControl>
                                    <FormControl.Label>Descripción del Grupo</FormControl.Label>
                                    <TextInput
                                        placeholder="Descripción del Grupo"
                                        value={groupDescription}
                                        onChangeText={setGroupDescription}
                                        style={styles.modalInput}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Seleccionar Coche</FormControl.Label>
                                    <Select
                                        selectedValue={selectedCoche}
                                        minWidth="200"
                                        accessibilityLabel="Elige un coche"
                                        placeholder="Elige un coche"
                                        _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />,
                                        }}
                                        mt={1}
                                        onValueChange={(itemValue) => setSelectedCoche(itemValue)}
                                    >
                                        {Array.isArray(userCoches) && userCoches.map((coche) => (
                                            <Select.Item key={coche.matricula} label={coche.marca} value={coche.matricula} />
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button onPress={handleCreateGroup}>
                                    Crear
                                </Button>
                            </VStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>

                <Modal isOpen={addUserModalVisible} onClose={() => setAddUserModalVisible(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Añadir Usuario a Grupo</Modal.Header>
                        <Modal.Body>
                            <VStack space={4}>
                                <FormControl isRequired>
                                    <FormControl.Label>Seleccionar Grupo</FormControl.Label>
                                    <Select
                                        selectedValue={selectedGroupId}
                                        minWidth="200"
                                        accessibilityLabel="Elige un grupo"
                                        placeholder="Elige un grupo"
                                        _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />,
                                        }}
                                        mt={1}
                                        onValueChange={(itemValue) => setSelectedGroupId(itemValue)}
                                    >
                                        {groups.map((group) => (
                                            <Select.Item key={group.id} label={group.nombre} value={group.id} />
                                        ))}
                                    </Select>
                                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                        Grupo es requerido.
                                    </FormControl.ErrorMessage>
                                </FormControl>
                                <Button onPress={handleConfirmAddUser}>
                                    Confirmar
                                </Button>
                            </VStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    modalInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    groupItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    removeButtonText: {
        color: 'red',
        fontSize: 16,
    },
});

export default Groups;
