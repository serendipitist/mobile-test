import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 0.44,
        marginBottom: 0,
        paddingTop: 50,
        marginLeft: 12,
    },
});

const ScreenTitle = () => {
    return <Text style={styles.screenTitle}>Magazine Issues</Text>;
};

export default ScreenTitle;
