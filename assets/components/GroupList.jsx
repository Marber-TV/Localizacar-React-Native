import React from 'react';
import { FlatList, View } from 'react-native';
import GroupItem from './GroupItem';
import { useTheme } from '../components/ThemeContext';

const GroupList = ({ groups, onLeaveGroup, onGroupPress }) => {
    const { theme } = useTheme();

    return (
        <View>
            <FlatList
                data={groups}
                renderItem={({ item }) => (
                    <GroupItem
                        group={item}
                        onLeave={() => onLeaveGroup(item.id)}
                        onPress={() => onGroupPress(item)}
                        theme={theme}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default GroupList;
