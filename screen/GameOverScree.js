import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
            <ScrollView>
                <View style={styles.screen}>
                    <TitleText> The Game is Over!</TitleText>
                    <View style={styles.imageContainer}>
                        <Image //source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Matterhorn_from_Domhütte_-_2.jpg'}} 
                            source={require('../assets/original.png')}
                            style={styles.image}
                            resizeMode="cover"
                            fadeDuration={10} />
                    </View>
                    <View style={styles.resultContainer}>
                        <BodyText style={styles.resultText}> Your phone needed
                        <Text style={styles.highlighted}> {props.roundsNumber} </Text>
                        rounds to guess the number
                        <Text style={styles.highlighted} > {props.userNumber} </Text>
                        </BodyText>
                    </View>
                    <MainButton onPressCustomButton={props.onRestart}>
                        {"RESTART"}
                    </MainButton>
                </View>
            </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: { //mandatory for images fetch from link
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.7 / 2,
        borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 40
    },
    highlighted: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 40,
        marginVertical: Dimensions.get('window').height < 400 ? 16 : 20,
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20,
    }
});

export default GameOverScreen;
