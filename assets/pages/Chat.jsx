import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { NativeBaseProvider, Text } from 'native-base';
import { fetchMessages, sendMessage } from '../services/groupService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route }) => {
    const { groupId, usermail } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        console.log(groupId)
        const fetchedMessages = await fetchMessages(groupId);
        setMessages(fetchedMessages);
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        const result = await sendMessage(groupId, usermail, newMessage);
        if (result) {
            setNewMessage('');
            loadMessages();
        }
    };

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <View style={styles.messageItem}>
                            <Text>{item.usermail}: {item.contenido}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Escribe un mensaje"
                    />
                    <Button title="Enviar" onPress={handleSendMessage} />
                </View>
            </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    messageItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginRight: 10,
    },
});

export default Chat;
