import { StyleSheet } from 'react-native';

const stylesGroups = StyleSheet.create({
    container: {
        flex: 1,
    },
    joinGroupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    joinButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    joinButtonText: {
        color: 'white',
    },
    fab: {
        backgroundColor: 'black',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

export default stylesGroups;
