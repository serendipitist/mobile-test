import React, { useState, useEffect } from 'react';
import type { PlatformIOSStatic } from 'react-native';
import { View, Text, FlatList, useWindowDimensions, Image, StyleSheet, Switch, ScrollView } from 'react-native';
import FootNote from './src/components/footNote';
import ListingSection from './src/components/listingSection';
import ScreenTitle from './src/components/title';

let listingData = require('./data.json');

const styles = StyleSheet.create({
    portrait: {
        textAlign: 'center',
        paddingTop: 10,
        borderRadius: 4,
    },

    landscape: {
        display: 'flex',
    },

    itemLandscape: {
        width: '50%', // is 50% of container width
    },

    toggleLabel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
    },

    toggleSwitch: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        marginBottom: 32,
        paddingBottom: 12,
    },
});

listingData = Object.keys(listingData.issues).map((key) => [listingData.issues[key]]);
listingData = listingData.map((item, index) => ({ ...item, id: index + 1 }));

const App = () => {
    const [isMagazineEnabled, setIsMagazineEnabled] = useState(true);
    const [isTravelEnabled, setIsTravelEnabled] = useState(true);
    const [isComputingEnabled, setIsComputingEnabled] = useState(true);
    const [isGardeningEnabled, setIsGardeningEnabled] = useState(true);

    const toggleSwitchMagazine = () => setIsMagazineEnabled((previousState) => !previousState);
    const toggleSwitchTravel = () => setIsTravelEnabled((previousState) => !previousState);
    const toggleSwitchComputing = () => setIsComputingEnabled((previousState) => !previousState);
    const toggleSwitchGardening = () => setIsGardeningEnabled((previousState) => !previousState);

    // eslint-disable-next-line complexity
    const getListingData = () => {
        const magazineData = listingData.filter((val) => val[0].cover.includes('Magazine'));
        const gardeningData = listingData.filter((val) => val[0].cover.includes('Gardening'));
				const travelData = listingData.filter((val) => val[0].cover.includes('travel'));
				const computingData = listingData.filter((val) => val[0].cover.includes('computing'));
        const combined = (a, b, c) => {
            return [...a, ...b, ...c];
        };
        if (isMagazineEnabled && isComputingEnabled && isTravelEnabled && isGardeningEnabled) return listingData;
        else if (isMagazineEnabled) return listingData.filter((val) => val[0].cover.includes('Magazine'));
        else if (isComputingEnabled) return listingData.filter((val) => val[0].cover.includes('Computing'));
        else if (isGardeningEnabled) return listingData.filter((val) => val[0].cover.includes('Gardening'));
        else if (isTravelEnabled) return listingData.filter((val) => val[0].cover.includes('Travel'));
				else if (isComputingEnabled && isGardeningEnabled) return listingData = combined(computingData, gardeningData, []);
        else if (!isMagazineEnabled && !isComputingEnabled && !isTravelEnabled && !isGardeningEnabled) {
            return [];
        }
    };

    return (
        <ScrollView>
            <ScreenTitle />
            <View style={styles.toggleLabel}>
                <Text>Magazine</Text>
                <Text>Gardening</Text>
                <Text>Travel</Text>
                <Text>Computing</Text>
            </View>
            <View style={styles.toggleSwitch}>
                <Switch value={isMagazineEnabled} onValueChange={toggleSwitchMagazine} />
                <Switch value={isGardeningEnabled} onValueChange={toggleSwitchGardening} />
                <Switch value={isTravelEnabled} onValueChange={toggleSwitchTravel} />
                <Switch value={isComputingEnabled} onValueChange={toggleSwitchComputing} />
            </View>
            <ListingSection listingData={getListingData()} />
            <FootNote />
        </ScrollView>
    );
};

export default App;
