import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GroupItem = ({ group, onPress, onLeave, theme }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { borderBottomColor: theme === 'dark' ? '#555' : '#ccc' }]}>
            <Ionicons name="people" size={24} color={theme === 'dark' ? '#fff' : 'black'} style={styles.icon} />
            <View style={styles.details}>
                <Text style={[styles.groupName, { color: theme === 'dark' ? '#fff' : 'black' }]}>{group.nombre}</Text>
            </View>
            <TouchableOpacity onPress={onLeave}>
                <Ionicons name="exit-outline" size={24} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    icon: {
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    groupName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GroupItem;
