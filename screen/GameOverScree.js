import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/Colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
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
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    highlighted: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer:{
        marginHorizontal: 40,
        marginVertical: 20
    },
    resultText:{
        textAlign: 'center',
        fontSize: 20,
    }
});

export default GameOverScreen;
