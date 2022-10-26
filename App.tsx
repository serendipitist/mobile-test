/* eslint-disable fp/no-let */
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
    ScrollView,
    SafeAreaView,
    FlatList,
    useWindowDimensions,
    Image,
} from 'react-native';
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

    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    landscapeContainer: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
    },

    coverImage: {
        width: 'auto',
        height: 260,
        overflow: 'hidden',
    },
    coverIssue: {
        fontSize: 14,
        display: 'flex',
        textAlign: 'center',
    },
    coverTitle: {
        fontSize: 21,
        lineHeight: 28,
        marginTop: 12,
        textAlign: 'center',
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
        paddingTop: 24,
    },

    landscapeCardItem: {
        background: '#fff',
        borderColor: 'black',
        height: 350,
        borderRadius: 10,
        textAlign: 'center',
        boxShadow: '0px 15px 88px -37px rgba(0,0,0,0.17)',
        margin: 10,
        paddingTop: 24,
        flexWrap: 'wrap',
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
        } else if (isComputingEnabled && isTravelEnabled && isGardeningEnabled) {
            combinedData = getCombinedData(computingData, travelData, gardeningData);
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

    const ListHeader = () => {
        //View to set in Header
        return (
            <SafeAreaView>
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
            </SafeAreaView>
        );
    };

    return (
        <FlatList
            style={{ flex: 1 }}
            nestedScrollEnabled={true}
            data={getListingData()}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={FootNote}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                return (
                    <View style={isPortrait ? styles.cardItem : styles.landscapeCardItem}>
                        <Image
                            style={styles.coverImage}
                            source={{
                                uri: item[0].uri,
                            }}
                        />
                        <Text style={styles.coverTitle}>{item[0].cover}</Text>
                        <Text style={styles.coverIssue}>{item[0].issue}</Text>
                    </View>
                );
            }}
        />
    );
};

export default App;
