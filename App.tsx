/* eslint-disable fp/no-let */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import FootNote from './src/components/footNote';
import ListingSection from './src/components/listingSection';
import ScreenTitle from './src/components/title';
import { getCombinedData } from './src/utils/helpers';

const data = require('./data.json');
let listingData = data;

const styles = StyleSheet.create({
    toggleLabel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 12,
    },

    toggleSwitch: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
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
        let combinedData;
        const magazineData = listingData.filter((val) => val[0].cover.includes('Magazine'));
        const gardeningData = listingData.filter((val) => val[0].cover.includes('Gardening'));
        const travelData = listingData.filter((val) => val[0].cover.includes('Travel'));
        const computingData = listingData.filter((val) => val[0].cover.includes('Computing'));

        if (isMagazineEnabled && isComputingEnabled && isTravelEnabled && isGardeningEnabled) return listingData;
        else if (isComputingEnabled && isGardeningEnabled && isMagazineEnabled) {
            combinedData = getCombinedData(computingData, gardeningData, magazineData);
            return [...combinedData];
        } else if (isComputingEnabled && isTravelEnabled && isMagazineEnabled) {
            combinedData = getCombinedData(computingData, travelData, magazineData);
            return [...combinedData];
        } else if (isComputingEnabled && isTravelEnabled && isMagazineEnabled) {
            combinedData = getCombinedData(computingData, travelData, magazineData);
            return [...combinedData];
        } else if (isGardeningEnabled && isTravelEnabled && isMagazineEnabled) {
            combinedData = getCombinedData(gardeningData, travelData, magazineData);
            return [...combinedData];
        } else if (isComputingEnabled && isGardeningEnabled) {
            combinedData = getCombinedData(computingData, gardeningData, []);
            return [...combinedData];
        } else if (isMagazineEnabled && isGardeningEnabled) {
            combinedData = getCombinedData(magazineData, gardeningData, []);
            return [...combinedData];
        } else if (isTravelEnabled && isComputingEnabled) {
            combinedData = getCombinedData(travelData, computingData, []);
            return [...combinedData];
        } else if (isTravelEnabled && isComputingEnabled) {
            combinedData = getCombinedData(travelData, computingData, []);
            return [...combinedData];
        } else if (isMagazineEnabled) return listingData.filter((val) => val[0].cover.includes('Magazine'));
        else if (isComputingEnabled) return listingData.filter((val) => val[0].cover.includes('Computing'));
        else if (isGardeningEnabled) return listingData.filter((val) => val[0].cover.includes('Gardening'));
        else if (isTravelEnabled) return listingData.filter((val) => val[0].cover.includes('Travel'));
        else if (!isMagazineEnabled && !isComputingEnabled && !isTravelEnabled && !isGardeningEnabled) {
            return [];
        }
    };

    return (
        <View>
            <ScrollView nestedScrollEnabled={true}>
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
        </View>
    );
};

export default App;
