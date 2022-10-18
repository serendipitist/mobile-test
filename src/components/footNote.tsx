import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    footnote: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff5d4',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: '100%',
        padding: 10,
        fontSize: 14,
        textAlign: 'center',
    },
});

const FootNote = () => (
    <View style={styles.footnote}>
        <Text>The full archive is available to Which? members</Text>
    </View>
);

export default FootNote;
