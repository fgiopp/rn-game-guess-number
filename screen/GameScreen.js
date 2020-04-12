import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Cards from '../components/Card';
import DefaultStyles from '../constants/default-style';
import MainButton from '../components/MainButton';

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

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] =
        useState(generateRandomBetween(1, 100, props.userChoice));

    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
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
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(rounds => rounds + 1);
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
        marginTop: 20,
        width: 400,
        maxWidth: '90%',
        alignItems: 'center'
    }
});

export default GameScreen;