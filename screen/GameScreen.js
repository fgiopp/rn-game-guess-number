import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';
import Cards from '../components/Card';
import DefaultStyles from '../constants/default-style';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exlcude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exlcude) {
        return generateRandomBetween(min, max, exlcude);
    } else {
        return rndNum;
    }
};

//key is used in View b/c each child in a list should have an unique key
/*const renderListItem = (value, numOfRound) => ( //used with ScrollView
<View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
</View>
);*/
const renderListItem = (listLenght, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLenght - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {

    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const intialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(intialGuess);
    const [pastGuesses, setPastGuesses] = useState([intialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice)
            || (direction === 'grater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie', 'You know that this is wrong ...',
                [{ text: 'Sorry', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.scree}>
            <Text style={DefaultStyles.bodyText}> Opponent's Guess </Text>
            <NumberContainer> {currentGuess} </NumberContainer>
            <Cards style={styles.buttonContainer}>
                <MainButton onPressCustomButton={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPressCustomButton={nextGuessHandler.bind(this, 'grater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Cards>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list} />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    scree: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20: 10,
        width: 400,
        maxWidth: '90%',
        alignItems: 'center'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '60%'
    },
    listContainer: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

export default GameScreen;