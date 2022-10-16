import React, { useState } from 'react';
import { View, Text, FlatList, useWindowDimensions, Image, StyleSheet, Switch } from 'react-native';

let magazineData = require('./data.json');

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 0.44,
        marginBottom: 0,
        paddingTop: 50,
				paddingLeft: 24,
    },
    portrait: {
        textAlign: 'center',
        paddingTop: 10,
        borderRadius: 4,
    },
    coverImage: {
        width: 'auto',
        height: 260,
        overflow: 'hidden',
    },

    coverTitle: {
        fontSize: 21,
        lineHeight: 28,
    },

    landscape: {
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

magazineData = Object.keys(magazineData.issues).map((key) => [magazineData.issues[key]]);
magazineData = magazineData.map((item, index) => ({ ...item, id: index + 1 }));

const App = (props) => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height > width;

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <View>
            <Text style={styles.screenTitle}>Magazine Issues</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{isEnabled ? 'Magazines' : ''}</Text>
                <Switch style={{ marginTop: 30 }} value={isEnabled} onValueChange={toggleSwitch} />
                <Text>{isEnabled ? 'Gardening' : ''}</Text>
                <Switch style={{ marginTop: 30 }} value={isEnabled} onValueChange={toggleSwitch} />
                <Text>{isEnabled ? 'Travel' : ''}</Text>
                <Switch style={{ marginTop: 30 }} value={isEnabled} onValueChange={toggleSwitch} />
                <Text>{isEnabled ? 'Computing' : ''}</Text>
                <Switch style={{ marginTop: 30 }} value={isEnabled} onValueChange={toggleSwitch} />
            </View>
            <FlatList
                data={magazineData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={isPortrait ? styles.portrait : styles.landscape}>
                            <Text>{item[0].issue}</Text>
                            <Text style={styles.coverTitle}>{item[0].cover}</Text>
                            <Image
                                style={styles.coverImage}
                                source={{
                                    uri: item[0].uri,
                                }}
                            />
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default App;
