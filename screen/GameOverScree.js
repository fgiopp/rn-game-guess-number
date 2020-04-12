import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText> The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image //source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Matterhorn_from_Domhütte_-_2.jpg'}} 
                    source={require('../assets/original.png')} 
                    style={styles.image}
                    resizeMode="cover" 
                    fadeDuration={10}/>
            </View>
            <BodyText> Your phone needed {props.roundsNumber} rounds to guess the number {props.userNumber}  </BodyText>
             <BodyText> Number was: {props.userNumber} </BodyText>
            <Button title="RESTART" onPress={props.onRestart}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{ //mandatory for images fetch from link
        width: '100%',
        height: '100%'
    },
    imageContainer:{
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    }
});

export default GameOverScreen;
