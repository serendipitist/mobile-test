import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    landscapeContainer: {},

    portraitContainer: {},

    coverImage: {
        width: 'auto',
        height: 260,
        overflow: 'hidden',
    },
    coverIssue: {
        fontSize: 14,
    },
    coverTitle: {
        fontSize: 21,
        lineHeight: 28,
        marginTop: 12,
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
    return (
        <>
            {listingData.length !== 0 ? (
                <FlatList
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
        </>
    );
};

export default ListingSection;
