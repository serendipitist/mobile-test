import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    LogBox,
    useWindowDimensions,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    landscapeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        flexBasis: '50%',
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
        width: '50%',
        borderRadius: 10,
        textAlign: 'center',
        boxShadow: '0px 15px 88px -37px rgba(0,0,0,0.17)',
        overflow: 'hidden',
        margin: 10,
        paddingTop: 24,
    },

    noData: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 12,
    },
});

const ListingSection = (props) => {
    const listingData = props.listingData;
    const noData = 'Oops!! no data to show';

    const { width, height } = useWindowDimensions();
    const isPortrait = height > width;

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    return (
        <SafeAreaView style={isPortrait ? styles.container : styles.landscapeContainer}>
            <ScrollView>
                {listingData.length !== 0 ? (
                    <FlatList
                        horizontal={isPortrait ? false : true}
                        data={listingData}
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
                                    <Text style={styles.coverTitle}>{item[0].cover}</Text>
                                    <Text style={styles.coverIssue}>{item[0].issue}</Text>
                                </View>
                            );
                        }}
                    />
                ) : (
                    <Text style={styles.noData}>{noData}</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ListingSection;
