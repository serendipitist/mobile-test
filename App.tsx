import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, useWindowDimensions, Image, StyleSheet, Switch, ScrollView, Platform } from 'react-native';

let listingData = require('./data.json');

console.log(Platform.OS, 'platform');

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
    coverIssue: {
        fontSize: 14,
				marginTop: 12,
    },
    coverTitle: {
        fontSize: 21,
        lineHeight: 28,
    },

    landscape: {
        display: 'flex',
    },

    itemLandscape: {
        width: '50%', // is 50% of container width
    },

    cardItem: {
        background: '#fff',
        borderColor: 'black',
        width: 'auto',
        height: 350,
        borderRadius: 10,
        textAlign: 'center',
        boxShadow: '0px 15px 88px -37px rgba(0,0,0,0.17)',
        overflow: 'hidden',
        margin: 10,
    },
});

listingData = Object.keys(listingData.issues).map((key) => [listingData.issues[key]]);
listingData = listingData.map((item, index) => ({ ...item, id: index + 1 }));

const App = () => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height > width;

    const [isMagazineEnabled, setIsMagazineEnabled] = useState(true);
    const [isTravelEnabled, setIsTravelEnabled] = useState(true);
    const [isComputingEnabled, setIsComputingEnabled] = useState(true);
    const [isGardeningEnabled, setIsGardeningEnabled] = useState(true);

    const toggleSwitchMagazine = () => setIsMagazineEnabled((previousState) => !previousState);
    const toggleSwitchTravel = () => setIsTravelEnabled((previousState) => !previousState);
    const toggleSwitchComputing = () => setIsComputingEnabled((previousState) => !previousState);
    const toggleSwitchGardening = () => setIsGardeningEnabled((previousState) => !previousState);

    const getListingData = () => {
        if (isMagazineEnabled) return listingData.filter((val) => val[0].cover.includes('Magazine'));
        else if (isComputingEnabled) return listingData.filter((val) => val[0].cover.includes('Computing'));
        else if (isGardeningEnabled) return listingData.filter((val) => val[0].cover.includes('Gardening'));
        else if (isTravelEnabled) return listingData.filter((val) => val[0].cover.includes('Travel'));
        else if (isMagazineEnabled && isComputingEnabled && isTravelEnabled && isGardeningEnabled) return listingData;
        else if (!isMagazineEnabled && !isComputingEnabled && !isTravelEnabled && !isGardeningEnabled) {
            return [];
        }
    };

    return (
        <ScrollView stickyHeaderIndices={[4]}>
            <Text style={styles.screenTitle}>Magazine Issues</Text>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 12,
                }}
            >
                <Text>Magazine</Text>
                <Text>Gardening</Text>
                <Text>Travel</Text>
                <Text>Computing</Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'stretch',
                    justifyContent: 'space-evenly',
                    marginBottom: 12,
                }}
            >
                <Switch value={isMagazineEnabled} onValueChange={toggleSwitchMagazine} />
                <Switch value={isGardeningEnabled} onValueChange={toggleSwitchGardening} />
                <Switch value={isTravelEnabled} onValueChange={toggleSwitchTravel} />
                <Switch value={isComputingEnabled} onValueChange={toggleSwitchComputing} />
            </View>

            <FlatList
                data={getListingData()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.cardItem}>
                            <Image
                                style={styles.coverImage}
                                source={{
                                    uri: item[0].uri,
                                }}
                            />
                            <Text style={styles.coverIssue}>{item[0].issue}</Text>
                            <Text style={styles.coverTitle}>{item[0].cover}</Text>
                        </View>
                    );
                }}
            />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: '#fff5d4',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100,
                    width: '100%',
                    padding: 10,
										textAlign: 'center',
								}}
            >
                <Text>The full archive is available to Which? members</Text>
            </View>
        </ScrollView>
    );
};

export default App;
